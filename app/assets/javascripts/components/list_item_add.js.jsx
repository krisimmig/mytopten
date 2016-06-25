  var ListItemAdd = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      title: '',
      description: '',
      link: '',
      image_url: 'http://placehold.it/350x150',
      hasChanged: false,
      csrfToken: $('meta[name=csrf-token]').attr('content')
    };
  },

  titleChange: function(event) {
    this.setState({
      hasChanged: true,
      title: event.target.value
    });
  },

  descriptionChange: function(event) {
    this.setState({
      hasChanged: true,
      description: event.target.value
    });
  },

  linkChange: function(event) {
    this.setState({
      hasChanged: true,
      link: event.target.value
    });
  },

  handleAddItemClick: function(event) {
    var self = this;
    event.preventDefault();
    var form = this.refs.uploadForm;
    formData = new FormData(form);

    $.ajax({
      url: '/list_items/',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      self.getFlux().actions.listItem.addToUiOnly(data.list_item);
    })
    .fail(function() {
      console.error('Error adding new list item.');
    });
  },

  render: function() {
    return (
      <div className='ListItem ListItem--add'>
        <label htmlFor='image'>Item image</label>
        <form ref='uploadForm' action='/list_items/' method='post' remote='true'>

          <input name="list_id" className="ListItem-input ListItem-input--hidden" value={ this.props.listId } readOnly></input>
          <input name="authenticity_token" className="ListItem-input ListItem-input--hidden" value={ this.state.csrfToken } readOnly></input>
          <input
            type='file'
            name='image_main'
          />
          <br />

          <label htmlFor='title'>Item title</label>
          <input
            type='text'
            name='title'
            rows='1'
            onChange={ this.titleChange }
          />

          <label htmlFor='title'>Item description</label>
          <textarea
            name='description'
            rows='4'
            onChange={ this.descriptionChange }
          />

          <label htmlFor='title'>Item link</label>
          <input
            type='text'
            name='link'
            onChange={ this.linkChange }
          />
          <button onClick={ this.handleAddItemClick }>Add to list</button>
        </form>
      </div>
    );
  }
});
