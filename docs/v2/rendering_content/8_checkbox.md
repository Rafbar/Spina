# Checkbox

Allows enabling a feature using a toggle in the admin, via a `checkbox` input.

## Theme configuration

```ruby
config.parts = [
  # ...
  {
    name: 'show_foo',
    title: 'Display Foo',
    part_type: 'Spina::Parts::Checkbox'
  }
]
```

## View template example

```erb
<% if content(:show_foo) %>
  <h2>Foo</h2>
  ...
<% end %>
```
