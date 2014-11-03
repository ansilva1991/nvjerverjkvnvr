# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141102194526) do

  create_table "game_histories", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "game_histories", ["user_id"], name: "index_game_histories_on_user_id", using: :btree

  create_table "maps", force: true do |t|
    t.integer  "game_history_id"
    t.text     "grid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "maps", ["game_history_id"], name: "index_maps_on_game_history_id", using: :btree

  create_table "survivors", force: true do |t|
    t.string   "name"
    t.string   "last_name"
    t.string   "sex"
    t.integer  "skin"
    t.integer  "hair"
    t.integer  "x"
    t.integer  "y"
    t.string   "zone_code"
    t.integer  "game_history_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "survivors", ["game_history_id"], name: "index_survivors_on_game_history_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name",                   default: "", null: false
    t.string   "last_name",              default: "", null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "zones", force: true do |t|
    t.integer  "map_id"
    t.string   "zone_code"
    t.string   "zone_type"
    t.integer  "x"
    t.integer  "y"
    t.text     "floor_tiles"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "zones", ["map_id"], name: "index_zones_on_map_id", using: :btree

end
