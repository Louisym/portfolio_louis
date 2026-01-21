import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWechat,
} from "@tabler/icons-react";
import { SiXiaohongshu } from "react-icons/si";

export const socials = [
  {
    id: "github",
    href: "https://github.com/Louisym",
    label: "GitHub",
    icon: IconBrandGithub,
    action: "link",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/yiminliuusc",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    action: "link",
  },
  {
    id: "wechat",
    href: "#",
    label: "WeChat",
    icon: IconBrandWechat,
    action: "modal",
    wechatId: "A13540478726", // 请替换为你的微信号
  },
];
