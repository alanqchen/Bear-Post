package main

import (
	"log"
	"os"

	"github.com/alanqchen/Bear-Post/backend/app"
	"github.com/alanqchen/Bear-Post/backend/config"
	"github.com/alanqchen/Bear-Post/backend/database"
	"github.com/alanqchen/Bear-Post/backend/routes"
)

/*
 * BEARPOST API - main.go
 * @author Alan Chen
 *
 * This handles calling the initialization steps and starting the API
 *
 * Big thanks to steffen for Backend File Structure from https://github.com/steffen25/golang.zone.
 */

func main() {
	log.Println("Starting up")
	var cfg config.Config
	log.Println("Looking for a config file")
	if _, err := os.Stat("config/app-custom.json"); !os.IsNotExist(err) {
		log.Println("Using config/app-custom.json")
		cfg, err = config.New("config/app-custom.json")
	} else if _, err := os.Stat("config/app.json"); !os.IsNotExist(err) {
		log.Println("Using config/app.json")
		cfg, err = config.New("config/app.json")
	} else if _, err := os.Stat("../app.json"); !os.IsNotExist(err) {
		log.Println("Using ../app.json")
		cfg, err = config.New("../app.json")
	} else if _, err := os.Stat("config/app-docker.json"); !os.IsNotExist(err) {
		log.Println("Using config/app-docker.json")
		cfg, err = config.New("config/app-docker.json")
	} else {
		log.Fatal("[FATAL] Failed to find config/app-custom.json or config/app.json or config/app-docker or ../app.json")
	}

	log.Println("Creating api")

	var db *database.Postgres
	app, db := app.New(cfg)
	defer db.Close()
	log.Println("Creating routes")
	router := routes.NewRouter(app)
	log.Println("Running api...")
	app.Run(router)
}
