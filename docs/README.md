{{TOC}}

# Getting Started

Drizzle is built on the [Node.js](TODO) platform, so be sure to have it installed before proceeding.

## Installation

[Download](https://github.com/cloudfour/drizzle/archive/master.zip) and extract a copy of the Drizzle source before navigating to the resulting folder and running:

```sh
npm start
```

This will install dependencies, build your toolkit, and start the development server. The results can then be viewed at <http://localhost:3000>.

If you're into [Yeoman](TODO), there's also a [generator](TODO) available for fine-tuned installations:

```sh
npm install -g generator-drizzle
yo drizzle
```

## Commands

Drizzle is controlled by [npm-scripts](https://docs.npmjs.com/misc/scripts) and [Gulp](http://gulpjs.com). Here are the ones you're most likely to need:

| Command      | Outcome
| ---          | ---
| `npm start`  | Install package dependencies<br>Generate static output<br>Start the development server<br>Watch for file changes
| `gulp build` | Generate static output
| `gulp clean` | Delete static output
| `gulp serve` | Start the development server

Refer to the [Tasks](TODO) section for information on the available Gulp tasks.

# Toolkit Structure

New projects will have a directory structure similar to this:

```
src
├── assets
├── data
├── helpers
├── pages
├── patterns
├── static
└── templates
```

## Assets

CSS files for your toolkit belong in **src/assets/toolkit/styles**:

```
assets/toolkit/styles
├── core
│   ├── config.css
│   └── base.css
└── toolkit.css
```

JavaScript files for your toolkit belong in **src/assets/toolkit/scripts**:

```
src/assets/toolkit/scripts
└── toolkit.js
```

Refer to the [Configuration](TODO) section for information on how CSS and JavaScript assets are processed at build time.

## Templates

Drizzle uses the [Handlebars](TODO) template engine. Template files for your toolkit and the Drizzle UI belong in **src/templates**:

```
src/templates
├── drizzle
│   ├── item.hbs
│   ├── labelheader.hbs
│   ├── logo.hbs
│   ├── nav.hbs
│   ├── page-item.hbs
│   └── swatch.hbs
├── blank.hbs
├── collection.hbs
└── default.hbs
```

Templates differ from Patterns and Pages in a few ways:

- They are for presentational UI (to _display_ content rather than to _be_ content).
- They do not utilize front-matter data.
- They cannot be iterated over in any way.

Files at the top-level of the templates directory are assumed to be layout templates:

**default.hbs** is used for standard pages that do require the presence of the Drizzle UI.

**blank.hbs** is used for special standalone pages that don't require the presence of the Drizzle UI.

**collection.hbs** is used for concatenating Pattern collections  into a single page.

These layout templates can be referenced and assigned by a Page's front-matter data:

```yaml
title: Demo Page
layout: blank
```

Refer to the [Recipes](TODO) section for examples of how to extend and create new layout templates.

## Helpers

Template helper files belong in **src/helpers**:

```
src/helpers
├── TODO: add some examples
```

**TODO**: How files in this directory get registered as helpers.

A handful of helpers are included by default to assist with looking up and listing data, Pages, and Patterns.

**{{data}}** provides access to data files:

```hbs
{{#with (data "articles/3")}}
  {{title}} by {{author}}
{{/with}}
```

**{{pages}}** provides access to Page listings:

```hbs
<ul>
  {{#each (pages "portfolio" sortby="date")}}
    <li>
      <a href="{{url}}">{{data.title}}</a>
    </li>
  {{/each}}
</ul>
```

**{{collections}}** provides access to Pattern collection listings:

```hbs
<ul>
  {{#each (collections "components" sortby="order")}}
    <li>
      <a href="{{url}}">{{name}}</a>
    </li>
  {{/each}}
</ul>
```

**{{#extend}}**, **{{#embed}}**, **{{#block}}** and **{{#content}}**:

The [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) helper suite is included to provide extensible "layout" behavior to all templates:

```hbs
{{! src/templates/foo.hbs }}
<html>
  <body>
    {{#block "main"}}
      Default content
    {{/block}}
  </body>
</html>
```

```hbs
{{#embed "foo"}}
  {{#content "main"}}
    Final content
  {{/content}}
{{/embed}}
```

```html
<html>
  <body>
    Final content
  </body>
</html>
```

Pattern templates can also benefit from these helpers:

```hbs
{{! src/patterns/components/button/base.hbs }}
<button class="Button {{class}}">
  {{#block "content"}}
    Base Button
  {{/block}}
</button>
```

```hbs
{{! src/patterns/components/button/primary.hbs }}
{{#embed "components.button.base" class="Button--primary"}}
  {{#content "content"}}
    Primary Button
  {{/content}}
{{/embed}}
```

```html
<button class="Button Button--primary">
  Primary Button
</button>
```

Refer to the [Configuration](TODO) section for examples of alternative ways helpers can be registered.

## Data

Data files in JSON or YAML format can placed in **src/data** to make their contents available to the global template context.

Some default files are included:

```
src/data
├── articles.yaml
├── colors.yaml
├── project.yaml
├── radfaces.json
└── specimens.yaml
```

Accessing values can be done with the `{{data}}` template helper. For example:

```yaml
# src/data/team.yaml
-
  name: Pete
  photo: pete.jpg
-
  name: Paul
  photo: paul.jpg
-
  name: Mary
  photo: mary.jpg
```

Using the `{{data}}` helper combined with `{{#each}}`:

```hbs
{{#each (data "team")}}
  <img src="{{photo}}" alt="{{name}}">
{{/each}}
```

Results in:

```html
<img src="pete.jpg" alt="Pete">
<img src="paul.jpg" alt="Paul">
<img src="mary.jpg" alt="Mary">
```

In addition to storing arbitrary data as files, data can also be associated directly to resources by using [front-matter](https://github.com/jxson/front-matter). Refer to the sections for [Patterns](TODO) and [Pages](TODO).

## Patterns

Pattern template files belong in **src/patterns**:

**TODO**:

- Directory tree example
- Explain significance of folder organization
- Explain front-matter (using vars within pattern file)
- Explain sorting and `order`

## Pages

Pages content files belong in **src/pages**:

**TODO**:

- Directory tree example
- Explain significance of folder organization
- Explain front-matter (using vars within pattern file)
- Explain supported types (`.md`)


# Customization

**TODO**:

Overview of relevant keys in `config.js`

## Branding

**TODO**:

- Explain logo partial
- Explain colors page and data

## Appearance

**TODO**:

- Explain class namespaces
- Changing how the Drizzle UI looks
- Code highlighting with Prism


# Recipes

**TODO**:

- Creating Patterns
- Creating Pages


# Tasks


# Advanced

**TODO**:

- Overriding CSS and JS for a specific page
- Extending Patterns using layout helpers
- Adding PostCSS plugins (`postcss-use`)
- browserslist/autoprefixer implications


# Browsers

**TODO**: 

Which are supported?


# Acknowledgements

**TODO**:

- Fabricator
- PatternLab
- http://solid.buzzfeed.com/


# Contributing

Checkout the repo
