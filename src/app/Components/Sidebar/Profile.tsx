import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl";
import Image from "next/image";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";


export default function Component() {
    const t = useTranslations('app');
    const { data: session } = useSession()
    const user = session?.user;
    
    const { theme, collapsed } = useGlobalState();
    const { name, image } = user ||{
        name: t("demo_user"),
        image: "/avatar1.png",
    };

    if (session) {

    }
    return (
        <ProfileStyled theme={theme} collapsed={collapsed}>
            <div className="profile">
                <div className="profile-overlay"></div>
                <div className="image">
                    <Image width={70} height={70} src={image || '/avatar1.png'} alt="profile" />
                </div>
                <div className="user-btn absolute z-20 top-0 w-full h-full">

                </div>
                <h1 className="capitalize">
                    {name}
                </h1>
            </div>
        </ProfileStyled>
    )

}


const ProfileStyled = styled.div<{ collapsed: boolean }>`
.profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  `;
