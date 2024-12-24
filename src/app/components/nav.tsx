/* eslint-disable @next/next/no-img-element */
'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
    const { data: session } = useSession()

    return (
        <div className="w-full sticky top-0 py-2 bg-[#334155] flex items-center justify-between px-4">
            <div className="text-center">
                <div className="font-bold text-2xl text-white">GalantAI</div>
            </div>
            
            <div className="flex items-center gap-4">
                {session ? (
                    <div className="flex items-center gap-3">
                        <div className="text-white">
                            {session.user?.name}
                        </div>
                        {session.user?.image && (
                            <img 
                                src={session.user.image} 
                                alt={session.user?.name || 'User'} 
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}