class AddConfigIntoSpinaResources < ActiveRecord::Migration[6.0]
  def change
    add_column :spina_resources, :config, :jsonb, default: {}, null: false
  end
end
