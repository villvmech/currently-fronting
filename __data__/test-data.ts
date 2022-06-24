import { Switch, Member } from '../utils/pk-types'

const sampleMember: Member = {
  id: '',
  uuid: '',
  name: '',
  display_name: null,
  color: '',
  birthday: null,
  pronouns: null,
  avatar_url: null,
  banner: null,
  description: null,
  created: null,
  proxy_tags: [],
  keep_proxy: false,
  privacy: null,
}

const sampleSwitch: Switch = {
  id: '',
  timestamp: '',
  members: [sampleMember],
}

export { sampleMember, sampleSwitch }
