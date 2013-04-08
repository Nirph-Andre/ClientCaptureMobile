


Table.Config = new Data.model('Config', 'x_config', {
  'name': EM.attr('string', {required: true, maxLength: 250}),
  'value': EM.attr('string', {required: true, maxLength: 250})
});

Table.Synch = new Data.model('Synch', 'x_synch', {
  'table': EM.attr('string', {required: true, maxLength: 100}),
  'mode': EM.attr('tinyint', {required: true}),
  'filter': EM.attr('string', {maxLength: 100}),
  'local_time': EM.attr('datetime', {}),
  'server_time': EM.attr('datetime', {})
});




Table.Item = new Data.model('Item', 'item', {
  'sid': EM.attr('int', {}),
  'synchdate': EM.attr('datetime', {}),
  'name': EM.attr('string', {required: true, maxLength: 100})
});

Table.Customer = new Data.model('Customer', 'customer', {
  'sid': EM.attr('int', {}),
  'synchdate': EM.attr('datetime', {}),
  'name': EM.attr('string', {required: true, maxLength: 250}),
  'surname': EM.attr('string', {required: false, maxLength: 250}),
  'email': EM.attr('string', {required: true, maxLength: 250}),
  'cell': EM.attr('string', {required: false, maxLength: 20}),
  'item_id': EM.belongsTo(Table.Item, {})
});
