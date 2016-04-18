'use strict';

module.exports = {
  'css:toolkit': {
    src: './src/assets/toolkit/styles/*.css',
    dest: './dist/assets/toolkit/styles',
    name: 'css:toolkit'
  },

  'css:drizzle': {
    src: './src/assets/**/drizzle.css',
    dest: './dist/assets',
    prefix: 'drizzle-',
    name: 'css:drizzle'
  },

  js: {
    plugins: {
      webpack: {
        entry: {
          // Drizzle UI scripts
          'drizzle/scripts/drizzle':
            './src/assets/drizzle/scripts/drizzle.js',
          // Common toolkit scripts
          'toolkit/scripts/toolkit':
            './src/assets/toolkit/scripts/toolkit.js'
        },
        output: {
          path: './dist/assets',
          filename: '[name].js'
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['babel-loader']
            }
          ]
        },
        externals: {}
      }
    }
  },

  serve: {
    plugins: {
      browserSync: {
        open: false,
        notify: false,
        files: ['./dist/**/*'],
        server: {baseDir: './dist'}
      }
    }
  },

  watch: {
    watchers: [
      {
        match: ['./src/assets/**/*.css'],
        tasks: ['css']
      },
      {
        match: ['./src/assets/**/*.js'],
        tasks: ['js']
      },
      {
        match: [
          './src/**/*.hbs',
          './src/data/**/*'
        ],
        tasks: ['drizzle']
      }
    ]
  },

  drizzle: {
    src: {
      patterns: {
        basedir: './src/patterns',
        glob: './src/patterns/**/*.hbs'
      },
      templates: {
        basedir: './src/templates',
        glob: './src/templates/**/*.hbs'
      }
    },
    dest: {
      pages: './dist',
      patterns: './dist/patterns'
    },
    fieldParsers: {
      notes: 'markdown'
    }
  }
};
