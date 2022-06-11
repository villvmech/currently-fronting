interface ProxyTag {
  prefix: string | null
  suffix: string | null
}

type Privacy = 'public' | 'private'

interface SystemPrivacy {
  description_privacy: Privacy
  pronoun_privacy: Privacy
  member_list_privacy: Privacy
  group_list_privacy: Privacy
  front_privacy: Privacy
  front_history_privacy: Privacy
}

interface System {
  id: string
  uuid: string
  name: string
  description: string | null
  tag: string
  pronouns: string | null
  avatar_url: string | null
  banner: string | null
  color: string
  created: string
  privacy: SystemPrivacy | null
}

interface MemberPrivacy {
  visibility: Privacy
  name_privacy: Privacy
  description_privacy: Privacy
  birthday_privacy: Privacy
  pronoun_privacy: Privacy
  avatar_privacy: Privacy
  metadata_privacy: Privacy
}

interface Member {
  id: string
  uuid: string
  name: string
  display_name: string | null
  color: string
  birthday: string | null
  pronouns: string | null
  avatar_url: string | null
  banner: string | null
  description: string | null
  created: string | null
  proxy_tags: ProxyTag[]
  keep_proxy: boolean
  privacy: MemberPrivacy | null
}

interface Switch {
  id: string
  timestamp: string
  members: Member[]
}

export type { ProxyTag, Privacy, SystemPrivacy, System, MemberPrivacy, Member, Switch }
