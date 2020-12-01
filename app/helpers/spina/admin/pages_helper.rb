module Spina
  module Admin
    module PagesHelper

      def link_to_add_repeater_fields(f)
        repeater_content = Spina::Parts::RepeaterContent.new(name: f.object.name, title: f.object.title)
        fields = f.fields_for(:content, [repeater_content], child_index: repeater_content.object_id) do |builder|
          render("spina/admin/parts/repeaters/fields", f: builder)
        end
        link_to '#', class: "add_structure_item_fields button button-link", data: {id: repeater_content.object_id, fields: fields.gsub("\n", "")} do
          icon_spina('plus')
        end
      end

      def data_attrs_for_image_collection(f)
        image = Spina::Parts::Image.new
        fields = f.fields_for(:images, [image], child_index: image.object_id) do |builder|
          render("spina/admin/parts/image_collections/fields", f: builder)
        end
        {fields: fields.gsub("\n", ""), id: image.object_id}
      end

      def build_parts(partable, parts)
        I18n.with_locale(@locale) do
          parts.map do |part|
            part_attributes = current_theme.parts.find{ |p| p[:name].to_s == part.to_s }
            current = partable.find_part(part)
            part_attributes[:title] = current.title if current
            partable.part(part_attributes)
          end
        end
      end

      def build_page_parts(page)
        if page.view_template.present?
          template_name = page.view_template.to_s
          view_template = current_theme.view_templates.find{ |v| v[:name].to_s == template_name }
          parts = view_template&.dig(:parts) || []
        else
          parts = page.parts.map(&:name)
        end
        build_parts(page, parts)
      end

      def parts_partial_namespace(part_type)
        part_type.tableize.sub(/\Aspina\/parts\//, '')
      end

      def flatten_nested_hash(hash)
        hash.flat_map{|k, v| [k, *flatten_nested_hash(v)]}
      end

      def page_ancestry_options(page)
        pages = Spina::Page.active.regular_pages.includes(:translations)
        pages = pages.where.not(id: page.subtree.ids) unless page.new_record? || !page.methods.include?(:subtree)

        (flatten_nested_hash(pages.arrange(order: :position)).map do |page|
          next if page.depth >= Spina.config.max_page_depth - 1
          page_menu_title = page.depth.zero? ? page.menu_title : " #{page.menu_title}".indent(page.depth, '-')
          [page_menu_title, page.id]
        end << [page.parent&.menu_title, page&.parent_id].compact).map(&:presence).uniq.compact
      end

      def option_label(part, value)
        t(['options',part.name,value].compact.join('.'))
      end
    end
  end
end
