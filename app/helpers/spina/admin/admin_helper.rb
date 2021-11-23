module Spina
  module Admin
    module AdminHelper
      def icon_spina(name)
        content_tag(:i, nil, class: "fa fa-#{name}")
      end

      def spina_nav_li(is_active, &block)
        tag.li(capture(&block), class: is_active ? 'active' : '', 'data-spina-nav': true)
      end

      def file_url(file)
        main_app.rails_service_blob_path(file.signed_id, file.filename)
      end

      if Spina.config.cdn_links
        def spina_image_url(image)
          main_app.rails_public_blob_url(image.file)
        end
      else
        def spina_image_url(image)
          # Allows SVGs to be displayed as they are not variable. Requires:
          # - https://github.com/Dreamersoul/administrate-field-active_storage/issues/36#issuecomment-608446819 to be applied
          #
          # Additionally, https://github.com/hopsoft/active_storage_svg_sanitizer/
          # should be added if users are able to upload their own SVG content due to:
          # https://github.com/rails/rails/issues/34665#issuecomment-445888009
          main_app.url_for(image)
        end
      end
    end
  end
end
