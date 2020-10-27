module Spina
  module Admin
    module AdminHelper

      def icon(name)
        content_tag(:i, nil, class: "fa fa-#{name}")
      end

      def icon_spina(name)
        content_tag(:i, nil, class: "fa fa-#{name}")
      end
    end
  end
end
