import type React from "react"

interface BannerProps {
  position: "top" | "bottom" | "sidebar"
  url: string // Accepts both image and video URLs
  link: string // Accepts both image and video URLs
  alt?: string // Accepts both image and video URLs
}

const Banner: React.FC<BannerProps> = ({ position, url, alt, link }) => {
  let containerStyle = ""
  let mediaSize = ""

  switch (position) {
    case "top":
      containerStyle = "w-screen h-[48px] md:h-[90px] flex justify-center items-center bg-blue-100"
      mediaSize = "w-[390px] h-[48px] md:w-[728px] md:h-[90px]"
      break
    case "bottom":
      containerStyle = "w-screen h-[48px] md:h-[90px] flex justify-center items-center bg-green-100 mt-8"
      mediaSize = "w-[390px] h-[48px] md:w-[728px] md:h-[90px]"
      break
    case "sidebar":
      containerStyle = "w-[300px] h-[250px] flex justify-center items-center bg-yellow-100"
      mediaSize = "w-[300px] h-[250px]"
      break
  }

  // Detect if the provided URL is an image or a video
  const isVideo = url.match(/\.(mp4|webm|ogg)$/i)

  return (
    <div className={containerStyle}>
      <a href={link} target="_blank">
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`${mediaSize} object-cover`}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={url}
          alt={alt}
          className={`${mediaSize} object-cover`}
        />
      )}
      </a>
    </div>
  )
}

export default Banner
