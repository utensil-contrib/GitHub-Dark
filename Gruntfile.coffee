module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON("package.json")
    srcDir: "./src"
    outputDir: "./dist"
    
    compass:
      dist:
        options:
          sassDir: "<%= srcDir %>"
          cssDir: "<%= outputDir %>"

#    haml:
#      development:
#        expand: true
#        cwd: "<%= srcDir %>"
#        src: ["**/*.haml"]
#        dest: "<%= outputDir %>"
#        ext: ".html"

    watch:
      css:
        files: "<%= srcDir %>/github-dark.scss"
        tasks: ["compass:dist"]
#      haml:
#        files: "<%= srcDir %>/**/*.haml"
#        tasks: ["haml:development"]
  )

#  grunt.loadNpmTasks('grunt-contrib-haml')
  grunt.loadNpmTasks('grunt-contrib-compass')
#  grunt.loadNpmTasks('grunt-contrib-coffee')
#  grunt.loadNpmTasks('grunt-contrib-requirejs')
#  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('default', ['compass:dist'])
#  grunt.registerTask('production',['haml:development', 'compass:dist','coffee:production'])