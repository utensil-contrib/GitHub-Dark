module.exports = function(grunt) {

  var colors = {
    '$blue':       '/*[[base-color]]*/ #4183C4', // #4078c0
    '$gray-dark':  '#999',    // #333 (text)
    '$gray-light': '#222',    // #999
    '$gray':       '#333',    // #767676
    '$green':      '#152',    // #6cc644
    '$orange':     'rgba(203,108,0,.8)', // #c9510c
    '$purple':     '#6E5494', // #6e5494
    '$red':        '#911',    // #bd2c00
    '$white':      '#181818', // #fff (backgrounds)

    // State indicators.
    '$status-renamed': '#383412', // #fffa5d
    '$status-pending': '#cb4',    // #cea61b

    // Repository type colors
    '$repo-private-text': '#fff9ea', // #4c4a42
    '$repo-private-bg':   '#4c4a42', // #fff9ea
    '$repo-private-icon': '#e9dba5', // ??

    // Alerts
    '$flash-border-blue': '#246',    // #bac6d3
    '$flash-bg-blue':     '#182030', // #e2eef9
    '$flash-text-blue':   '#8195be', // #246

    '$flash-border-yellow': '#542',  // #dfd8c2
    '$flash-bg-yellow':     '#321',  // #fff9ea
    '$flash-text-yellow':   '#b74',  // #4c4a42

    '$flash-border-red': '#b00',     // #d2b2b2
    '$flash-bg-red':     '#911',     // #fcdede
    '$flash-text-red':   '#c31e16',  // #911

    // Border colors
    '$border-blue':       '#246',    // #c5d5dd
    '$border-gray-dark':  '#484848', // #ddd
    '$border-gray-light': '#222',    // #eee
    '$border-gray':       '#484848', // #e5e5e5

    // Background colors
    '$bg-blue-light': '#4078c0', // #f2f8fa
    '$bg-gray-light': '#181818', // #fafafa
    '$bg-gray':       '#222',    // #f5f5f5
    '$text-green':    '#55a532', // darken($green, 10%)

    // colors not defined in primer
    '#f2f9fc' : '#222', // commit-tease background
    '#c9e6f2' : '#444', // commit-tease border
    '#f7f7f7' : '#333', // file-header

    // extra text replacements
    'border-color: 0;': '' // postcss-colors-only problem?
  },

  // make css pastable
  finalization = {
    // add !important flags to everything!
    '(\s*!important\s*)?;' : ' !important;',
    // perfectionist doesn't add a CR before comments
    '{/*!' : '{\n/*!'
  },

  placeholders = {
    // scss variables from https://github.com/primer/primer/blob/master/scss/_variables.scss
    // Brand
    '#4078c0' : '$blue',       // $blue:       #4078c0
    '#333'    : '$gray-dark',  // $gray-dark:  #333
    '#999'    : '$gray-light', // $gray-light: #999
    '#767676' : '$gray',       // $gray:       #767676
    '#6cc644' : '$green',      // $green:      #6cc644
    '#c9510c' : '$orange',     // $orange:     #c9510c
    '#6e5494' : '$purple',     // $purple:     #6e5494
    '#bd2c00' : '$red',        // $red:        #bd2c00
    '#fff'    : '$white',      // $white:      #fff

    // State indicators.
    '#fffa5d' : '$status-renamed', // $status-renamed: #fffa5d
    '#cea61b' : '$status-pending', // $status-pending: #cea61b

    // Repository type colors
    '#4c4a42' : '$repo-private-text', // $repo-private-text: #4c4a42
    '#fff9ea' : '$repo-private-bg',   // $repo-private-bg:   #fff9ea
    '#e9dba5' : '$repo-private-icon', // $repo-private-icon: #e9dba5

    // Alerts
    '#bac6d3' : '$flash-border-blue', // $flash-border-blue: #bac6d3
    '#e2eef9' : '$flash-bg-blue',     // $flash-bg-blue: #e2eef9
    '#246'    : '$flash-text-blue',   // $flash-text-blue: #246

    '#dfd8c2' : '$flash-border-yellow', // $flash-border-yellow: #dfd8c2
    // '#fff9ea' : '$flash-bg-yellow',     // $flash-bg-yellow: #fff9ea
    // '#4c4a42' : '$flash-text-yellow',   // $flash-text-yellow: #4c4a42

    '#d2b2b2' : '$flash-border-red', // $flash-border-red: #d2b2b2
    '#fcdede' : '$flash-bg-red',     // $flash-bg-red:     #fcdede
    '#911'    : '$flash-text-red',   // $flash-text-red:   #911

    // Border colors
    '#c5d5dd' : '$border-blue',       // $border-blue:       #c5d5dd
    '#ddd'    : '$border-gray-dark',  // $border-gray-dark:  #ddd
    '#eee'    : '$border-gray-light', // $border-gray-light: #eee
    '#e5e5e5' : '$border-gray',       // $border-gray:       #e5e5e5

    // Background colors
    '#f2f8fa' : '$bg-blue-light', // $bg-blue-light: #f2f8fa
    '#fafafa' : '$bg-gray-light', // $bg-gray-light: #fafafa
    '#f5f5f5' : '$bg-gray',       // $bg-gray:       #f5f5f5

    // Text colors
    '#55a532' : '$text-green' // $text-green: darken($green, 10%)
  },

  // character to escape in regex
  escRegex = function(str) {
    return new RegExp(str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
  },

  replaceStuff = function(css, list) {
    var indx, regex,
      keys = Object.keys(list),
      len = keys.length;
    for (indx = 0; indx < len; indx++) {
      regex = escRegex(keys[indx]);
      css = css.replace(regex, list[keys[indx]]);
    }
    return css;
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      css: {
        src: ['github-darkv2.css', 'temp.css']
      },
      tidyup: {
        src: ['temp.css']
      }
    },
    concat: {
      githubsrc: {
        src: ['github/*.css'],
        dest: 'temp.css'
      },
      ghdsrc: {
        src: [
          'src/intro.css',
          'temp.css',
          'src/main-*.css',
          'src/extra-*.css',
          'src/outro.css'
        ],
        dest: 'github-darkv2.css'
      }
    },
    postcss: {
      cleanGitHub: {
        options: {
          processors: [
            require('postcss-colors-only')(),
            require('perfectionist')({
              format: 'compact'
            })
          ]
        },
        src: 'temp.css',
        dest: 'temp.css'
      },
      finalize : {
        options: {
          processors: [
            require('perfectionist')({
              format: 'compact',
              maxSelectorLength: 80,
              indentSize: 2
            })
          ]
        },
        src: 'github-darkv2.css',
        dest: 'github-darkv2.css'
      }
    }
  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-postcss');

  // clean up GitHub source css
  grunt.registerTask('replace-colors', 'Cleaning GitHub source CSS', function() {
    if ( !grunt.file.exists('temp.css') ) {
      grunt.log.error( 'file "temp.css" not found' );
      return false;
    }
    var css = grunt.file.read('temp.css'),
      temp = css.split('\n'),
      len = temp.length;

    // remove default syntax highlighting (.pl-xx) & ace editor (.ace_) definitions
    for (indx = 0; indx < len; indx++) {
      if (/^(\.pl-|\.ace[_-])/.test(temp[indx])) {
        temp[indx] = '';
      }
    }

    // add temporary placeholders
    css = replaceStuff(temp.join('\n'), placeholders);
    // add GitHub dark replacement colors
    css = replaceStuff(css, colors);

    grunt.file.write('temp.css', css);
  });

  grunt.registerTask('finalize', 'Finalizing CSS', function() {
    if (!grunt.file.exists('github-darkv2.css')) {
      grunt.log.error( 'file "github-darkv2.css" not found' );
      return false;
    }
    var css = grunt.file.read('github-darkv2.css');
    // add !important flags
    css = replaceStuff(css, finalization);
    grunt.file.write('github-darkv2.css', css);
  });


  // Generate and format the CSS
  grunt.registerTask('default', [
    'clean:css',
    'concat:githubsrc',
    'postcss:cleanGitHub',
    'replace-colors',
    'concat:ghdsrc',
    'postcss:finalize',
    'finalize',
    'clean:tidyup'
  ]);

};
