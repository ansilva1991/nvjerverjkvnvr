# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

Rails.application.config.assets.precompile += %w( bootstrap.css )
Rails.application.config.assets.precompile += %w( bootstrap-theme.css )
Rails.application.config.assets.precompile += %w( play.css )

Rails.application.config.assets.precompile += %w( survivors.js )
Rails.application.config.assets.precompile += %w( play.js )
Rails.application.config.assets.precompile += %w( libs/pathfinding-browser.min.js )
Rails.application.config.assets.precompile += %w( libs/pluralize.js )
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
