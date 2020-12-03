(() => {
  const application = Stimulus.Application.start()

  application.register("repeater-form", class extends Stimulus.Controller {
    static get targets() {
      return ["list", "listItem", "content", "pane"]
    }

    connect() {
      Sortable.create(this.listTarget, {
        handle: '.sortable-handle',
        onUpdate: function(event) {
          let order_of_ids = [...this.listTarget.children].map(function(item) {
            return parseInt(item.dataset.partId)
          })

          // Sort the DOM elements containing the repeater fields
          let panes = [...this.contentTarget.children]
          let listIndex = (node) => order_of_ids.indexOf(parseInt(node.dataset.partId))
          panes = panes.sort((a, b) => listIndex(a) - listIndex(b))
          panes.map(node => this.contentTarget.appendChild(node))
        }.bind(this)
      })
    }

    delete(event) {
      event.preventDefault()
      let part_id = event.currentTarget.dataset.partId

      let pane = this.element.querySelector(`.structure-form-pane[data-part-id="${part_id}"]`)
      let listItem = this.element.querySelector(`.structure-form-menu li[data-part-id="${part_id}"]`)

      pane.parentElement.removeChild(pane)
      listItem.parentElement.removeChild(listItem)
    }
    
  })
})()
