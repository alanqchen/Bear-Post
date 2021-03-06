create schema post_schema;
create schema user_schema;

create table post_schema.post
(
	id integer not null,
	title text default 'Post' not null,
	slug text default '' not null,
	body text default '' not null,
	created_at timestamptz not null,
	updated_at timestamptz default null,
	tags text[] default '{}' not null,
	hidden boolean default true not null,
	authorid uuid not null,
	feature_image_url text default '/assets/images/default-image.png' not null,
	subtitle text default '' not null,
	views integer default 0 not null
);

create unique index post_id_uindex
	on post_schema.post (id);

create unique index post_slug_uindex
	on post_schema.post (slug);

alter table post_schema.post
	add constraint post_pk
		primary key (id);

create sequence post_schema.post_id_seq;

alter table post_schema.post alter column id set default nextval('post_schema.post_id_seq');

alter sequence post_schema.post_id_seq owned by post_schema.post.id;

create table user_schema."user"
(
	id uuid not null,
	name text not null,
	email text default '' not null,
	password text not null,
	admin boolean default false not null,
	created_at timestamptz not null,
	updated_at timestamptz default null,
	username text not null
);

create unique index user_id_uindex
	on user_schema."user" (id);

create unique index user_username_uindex
	on user_schema."user" (username);

alter table user_schema."user"
	add constraint user_pk
		primary key (id);
