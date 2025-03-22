import type React from "react"

interface PromoCardProps {
    title: string
    description: string
    ctaText: string
    ctaLink: string
    bgColor?: string
    textColor?: string
}

const PromoCard: React.FC<PromoCardProps> = ({
                                                 title,
                                                 description,
                                                 ctaText,
                                                 ctaLink,
                                                 bgColor = "bg-blue-50",
                                                 textColor = "text-blue-800",
                                             }) => {
    return (
        <div className={`promo-card ${bgColor} p-4 rounded-lg shadow-sm hidden md:block`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
                    <p className={`text-sm mt-1 ${textColor} opacity-90`}>{description}</p>
                </div>
                <a
                    href={ctaLink}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
                >
                    {ctaText}
                </a>
            </div>
        </div>
    )
}

export default PromoCard

