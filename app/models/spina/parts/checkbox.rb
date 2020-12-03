# frozen_string_literal: true

module Spina
  module Parts
    class Checkbox < Base
      attr_json :content, :boolean, default: false
    end
  end
end
