[node]: http://nodejs.org
[gulp]: http://gulpjs.com
[npm-scripts]: https://docs.npmjs.com/misc/scripts
[handlebars]: http://handlebarsjs.com
[handlebars-layouts]: https://github.com/shannonmoeller/handlebars-layouts
[front-matter]: https://github.com/jxson/front-matter
[marked]: https://github.com/chjj/marked

{{TOC}}

# Getting Started

Drizzle is built on the [Node.js](node) platform, so be sure to have it installed before proceeding.

## Installation

[Download](https://github.com/cloudfour/drizzle/archive/master.zip) and extract a copy of the Drizzle source, then run this command in the resulting directory:

```sh
npm start
```

This will install dependencies, build your toolkit, and start the development server at <http://localhost:3000>.

## Commands

Drizzle is controlled by [npm-scripts](npm-script) and [Gulp](gulp). Here are the commands you'll use most often:

| Command      | Outcome
| ---          | ---
| `npm start`  | Install package dependencies, build your toolkit, start the development server, and watch for file changes.
| `gulp build` | Build your toolkit.
| `gulp serve` | Start the development server.

- [ ] **TODO**: ^ Are we happy with these?

_Refer to the [Tasks](#tasks) section for information on the available Gulp tasks._


# Toolkit Structure

New projects will have a directory structure similar to:

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
└── toolkit.css
```

JavaScript files for your toolkit belong in **src/assets/toolkit/scripts**:

```
src/assets/toolkit/scripts
└── toolkit.js
```

_Refer to the [Configuration](#configuration) section for information on how CSS and JavaScript assets are processed at build time._

## Templates

Drizzle uses the [Handlebars](handlebars) template engine. Template files for your toolkit and the Drizzle UI belong in **src/templates**:

```
src/templates
├── drizzle
├── blank.hbs
├── collection.hbs
└── default.hbs
```

The templates in this directory differ from [Patterns](#patterns) and [Pages](#pages) in a few ways:

- They are for _presenting_ content (opposed to _being_ content).
- They do not utilize [front-matter](front-matter) data.
- They cannot be iterated over in any way.

### Layout templates

Files at the top-level of the templates directory are assumed to be layout templates:

| Layout             | Usage 
| ---                | ---
| **default.hbs**    | This is for standard pages that do require the presence of the Drizzle UI.
| **blank.hbs**      | This is used for special standalone pages that don't require the presence of the Drizzle UI.
| **collection.hbs** | This is used for concatenating Pattern collections  into a single page.

[Pages](#pages) can use these layout templates by referencing them in the **layout** property of their [front-matter](front-matter) data:

```yaml
title: Demo Page
layout: blank
```

_Refer to the [Recipes](#recipes) section for examples of how to extend and create new layout templates._

## Helpers

[Handlebars](handlebars) helper functions belong in **src/helpers**:

```

```

- [ ] **TODO**: Add example ^
- [ ] **TODO**: Explain how files in this directory get registered as helpers.

A handful of helpers are included by default to assist with looking up and listing [Data](#data), [Pages](#pages), and [Patterns](#patterns).

**{{data}}** provides access to [Data](#data):

```hbs
{{#with (data "articles/3")}}
  {{title}} by {{author}}
{{/with}}
```

**{{pages}}** provides access to [Page](#pages) listings:

```hbs
<ul>
  {{#each (pages "portfolio" sortby="date")}}
    <li>
      <a href="{{url}}">{{data.title}}</a>
    </li>
  {{/each}}
</ul>
```

**{{collections}}** provides access to [Pattern collection](#patterncollections) listings:

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

The [handlebars-layouts](handlebars-layouts) helper suite is included to provide extensible "layout" behavior to all templates:

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

_Refer to the [Configuration](#configuration) section for examples of alternative ways helpers can be registered._

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

- name: Pete
  photo: pete.jpg
  
- name: Paul
  photo: paul.jpg
  
- name: Mary
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

_Refer to the sections for [Patterns](#patternmetadata) and [Pages](#pages) for examples of how data can also be associated directly to resources using [front-matter](front-matter)._

## Patterns

Pattern template files belong in **src/patterns**.

Example input:

```
src/patterns
├── components
│   ├── button
│   │   ├── base.hbs
│   │   └── primary.hbs
│   └── grid
│       ├── default.hbs
│       └── responsive.hbs
└── elements
    ├── forms
    │   ├── select.hbs
    │   └── textarea.hbs
    └── typographic
        ├── headings.hbs
        └── paragraphs.hbs
```

Example output:

```
dist/patterns
├── components
│   ├── button.html
│   └── grid.html
└── elements
    ├── forms.html
    └── typographic.html
```

The default structure shows how you might organize patterns classified as **components** and **elements**, but you can use any naming convention you prefer for the folders:

```
src/patterns
├── atoms
├── molecules
└── organisms
```

### Pattern collections

A _pattern collection_ is any folder within **src/patterns** that is the parent to one or more template files. The files can be named anything with a **.hbs** or **.html** extension.

For example, the pattern collection for a button component could be structured as:

```
src/patterns/components/button
├── base.hbs
└── primary.hbs
```

These pattern variations would be accessible from other templates as a partials:

```hbs 
{{> patterns.components.button.base}}
```

And for more complex cases, the **{{#extend}}** and **{{#embed}}** helpers can be used instead:

```hbs
{{#embed "patterns.components.button.base}}
  ...
{{/embed}}
```

_Refer to the [Recipes](#recipes) section for examples of extending and embedding patterns._

### Pattern metadata

Like [Pages](#pages), Patterns can leverage [front-matter](front-matter) for local data:

```yaml
name: Basic Button
notes: |
  This is just a **basic button**.
links:
  man: https://developer.mozilla.org/.../Element/button
```

While any arbitrary YAML data can be added, there are some special predefined properties that apply to Patterns:

| Property   | Type    | Usage
| ---        | ---     | ---
| **name**   | string  | This will override the default name based on the filename of the template.
| **order**  | number  | This controls the placement relative to neighboring files when the Pattern variations are listed.
| **hidden** | boolean | This hides the Pattern variation from listings, but not from being included as a partial.
| **notes**  | string  | This is used to provide detailed information about the Pattern variation, and can include [Markdown](marked) formatting.
| **links**  | object  | This is used to provide a listing of links to additional documentation. 

Metadata can also be applied to the collections themselves by using a **collection.yaml** file at the root of the directory:

```
src/patterns/components/button
├── collection.yaml
├── base.hbs
└── primary.hbs
```


## Pages

Page content files belong in **src/pages**, and can be authored as [Markdown](marked) files, [Handlebars](handlebars) templates, or standard HTML:

Example input: 

```
src/pages
├── demos
│   ├── example.hbs
│   └── index.hbs
├── docs
│   ├── example.md
│   └── index.hbs

└── index.hbs
```

Example output: 

```
dist
├── demos
│   ├── example.html
│   └── index.html
├── docs
│   ├── example.html
│   └── index.html
├── colors.html
└── index.html
```

### Page metadata

Like [Patterns](#patterns), Pages can leverage [front-matter](front-matter) for local data:

```yaml
title: Naming Conventions
layout: default
```

```yaml
title: Modal Demo (Fullscreen)
layout: blank
```


# Customization

- [ ] **TODO**: Overview of relevant keys in `config.js`

## Branding

- [ ] **TODO**: Explain logo partial
- [ ] **TODO**: Explain colors page and data

## Appearance

- [ ] **TODO**: Explain class namespaces
- [ ] **TODO**: Changing how the Drizzle UI looks
- [ ] **TODO**: Code highlighting with Prism


# Recipes

- [ ] **TODO**: Creating Patterns
- [ ] **TODO**: Creating Pages


# Tasks

- [ ] **TODO**: Explain the tasks

# Advanced

- [ ] **TODO**: Overriding CSS and JS for a specific page
- [ ] **TODO**: Extending Patterns using layout helpers
- [ ] **TODO**: Adding PostCSS plugins (`postcss-use`)
- [ ] **TODO**: browserslist/autoprefixer implications


# Browsers

- [ ] **TODO**: Which are supported?


# Acknowledgements

- [ ] **TODO**: Fabricator
- [ ] **TODO**: PatternLab
- [ ] **TODO**: http://solid.buzzfeed.com/


# Contributing

- [ ] **TODO**: Checkout the repo
