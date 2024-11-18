require('dotenv').config();


const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {

    // Set the pathPrefix for production
    if (process.env.ELEVENTY_ENV === 'production') {
      return {
        pathPrefix: "/your-repo-name/"
      }
    }

  // Add cloudinaryUrl filter
  eleventyConfig.addFilter("cloudinaryUrl", (imagePath) => {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${imagePath}`;
  });

  // Add YAML data file support
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Human-readable date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  // Minify HTML files in production
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });


  eleventyConfig.addCollection("exhibitions", function(collectionApi) {
    const exhibitions = collectionApi.getFilteredByGlob("exhibitions/*.md");
    console.log("Exhibitions:", exhibitions);
    return exhibitions;
  });

  eleventyConfig.addCollection("works", function(collectionApi) {
    const works = collectionApi.getFilteredByGlob("works/*.md");
    return works;
  });


  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("*.js");
  eleventyConfig.addPassthroughCopy("admin");
  // eleventyConfig.addPassthroughCopy("images/uploads");

  // Set custom directory structure
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }

  };

};
