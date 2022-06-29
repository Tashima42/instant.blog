export default interface MainConfig {
  title: string;
  author: string;
  avatar?: string;
  background?: string;
  social?: Socials[];
}

interface Socials {
  name: string;
  url: string;
  icon: string;
}
