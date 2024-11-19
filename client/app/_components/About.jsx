import React from 'react'
import Image from 'next/image'
import soccer from "../../images/sb.jpg"

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2'>Why <span className='underline underline-offset decoration-1 under font-light'>SoccerBrite?</span>
        </h1>

        <p className='text-gray-500 max-w-80 text-center mb-8'>Passionate About Soccer, Dedicated to Soccer</p>

        <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20 mt-10'>
            <Image src={soccer} alt='soccer'/>
            <div className="flex flex-col items-center md:items-start text-gray-600">
                <div className="grid gird-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28">
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>Connect with Players</p>
                        <p>Invite friends or meet new players to join your soccer group</p>
                    </div>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>Invite Friends to Watch</p>
                        <p>Gather your friends and enjoy the excitement of live soccer togethere</p>
                    </div>
                    <div>
                        <p className='text-4xl font-medium text-gray-800'>Join the Community</p>
                        <p>Connect with players near you or invite friends to your soccer group</p>
                    </div>
                   

                </div>

                <p className="my-10 max-w-lg">Showcase your skills with friends, invite them to play, and create exciting soccer events in just a few clicks. Whether you're organizing a casual pick-up game or a competitive match, SoccerBrite makes it easy to host, manage, and share soccer events. Find players, reserve fields, and bring the game to life—anytime, anywhere.</p>

                <button className='bg-blue-600 text-white px-8 py-2 rounded'>Learn More</button>
            </div>

        </div>
        
    </div>
  )
}

export default About