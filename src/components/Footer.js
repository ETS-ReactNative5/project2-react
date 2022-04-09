import React from 'react'

import { BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { GrFacebook } from 'react-icons/gr'




function Footer() {
    return (
        <React.Fragment>

            <div className='row px-3'>
                <div className='col-12 col-md-5'>
                    <h6>Orchid Registries</h6>
                    <ul>
                        <li>
                            <a href="https://www.aos.org/about-us/orchid-conservation/plants-database.aspx" target="_blank">American Orchid Society</a>
                        </li>
                        <li>
                            <a href="https://apps.rhs.org.uk/horticulturaldatabase/orchidregister/orchidregister.asp" target="_blank">International Orchid Registry</a>
                        </li>
                        <li>
                            <a href="http://www.orchidspecies.com/" target="_blank">Internet Orchid Species Photo Encyclopedia</a>
                        </li>
                    </ul>
                </div>
                <div className='col-12 col-md-4'>
                    <h6>Orchid Forums</h6>
                    <ul>
                        <li>
                            <a href="http://www.orchidboard.com/community/" target="_blank">Orchid Board</a>
                        </li>
                        <li>
                            <a href="https://www.orchidsforum.com/" target="_blank">Orchid Forum</a>
                        </li>
                        <li>
                            <a href="https://www.orchidwire.com/Forums/1/index.html" target="_blank">Orchid Wire</a>
                        </li>
                    </ul>
                </div>
                <div className='col-12 col-md-3 d-flex flex-column'>

                    <h6>Connect</h6>

                    <div>
                    <button className='btn shadow-none'>
                        <a className='style-links'
                            href="http://www.facebook.com/" target="_blank"
                        >
                            <GrFacebook color={'#157C43'}/>
                        </a>
                    </button>
                    <button className='btn shadow-none'>
                        <a className='style-links'
                            href="http://www.twitter.com/" target="_blank"
                        >
                            <BsTwitter color={'#157C43'}/>
                        </a>
                    </button>
                    <button className='btn shadow-none'>
                        <a className='style-links'
                            href="http://www.instagram.com/" target="_blank"
                        >
                            <AiFillInstagram fontSize={'1.3rem'} color={'#157C43'} />
                        </a>
                    </button>

                    </div>
                    


                </div>

            </div>

        </React.Fragment>
    )
}


export default Footer