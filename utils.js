import moment from 'moment'

export const formatThread = thread => ({
  ...thread,
  last_activity_date: moment(+thread.last_activity_at).format('D MMM'),
  content:
    (thread.last_permanent_item.item_type === 'reel_share' && thread.last_permanent_item.reel_share.text) ||
    (thread.last_permanent_item.item_type === 'text' && thread.last_permanent_item.text) ||
    (thread.last_permanent_item.item_type === 'raven_media' && 'image'),
})
