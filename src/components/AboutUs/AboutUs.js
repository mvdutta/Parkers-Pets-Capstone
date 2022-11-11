import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import styles from "./AboutUs.module.css"

export const AboutUs = () => {
  return (<>
   <NavBar/>

    <div className={styles.myContainer}>
      <header>
        <h1>About Us</h1>
      </header>
    <div className={styles.contentHolder}>
      <h2 className={styles.aboutHeader}>We Love Your Pets!</h2>
      <p className={styles.textHolder}>Parker's Pet Sitting is a Nashville, Tennesse based pet care and pet sitting company. We are dedicated to providing customizable and high quality care for any type of pet. 
      </p>
      <p className={styles.textHolder}>Our pet sitters specialize in your type of pet(s), so that you can have the peace of mind knowing that your pet will receive the best care when you can't be there. Many of our pet sitters are also certified veterinary technicians, or have experience administering medications and can care for pets who are medically fragile.  

      </p>
      <img src="/dog-line.png" className={styles.dogLineImage} />
    </div>
  <div className={styles.imageContainer}>
  <div className={styles.row}> 
  <div className={styles.column}>
    <img src="https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751__340.jpg" />
    <img src="https://images.pexels.com/photos/3234841/pexels-photo-3234841.jpeg?auto=compress&cs=tinysrgb&w=1600"/> 
    <img src="https://images.pexels.com/photos/2725982/pexels-photo-2725982.jpeg?auto=compress&cs=tinysrgb&w=1600"/> 
   
  </div>
  <div className={styles.column}>
    <img src="https://cdn.pixabay.com/photo/2019/05/18/22/13/parrot-4212696__340.jpg" />
    <img src="https://cdn.pixabay.com/photo/2022/07/07/18/24/antilles-pinktoe-tarantula-7307686__340.jpg" />   
    <img src="https://cdn.pixabay.com/photo/2018/02/16/20/00/lizards-3158450__340.jpg" />
    <img src="https://images.pexels.com/photos/662417/pexels-photo-662417.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <img src="https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTg3NzE4ODQ5ODAwOTcyMTc1/top-10-pet-snake-for-beginners-in.jpg" className={styles.snakeImage} />
  </div>  
  <div className={styles.column}>
    <img src="https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <img src="https://images.pexels.com/photos/10333865/pexels-photo-10333865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
    <img src="https://images.pexels.com/photos/1894349/pexels-photo-1894349.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <img src="https://images.pexels.com/photos/2215599/pexels-photo-2215599.jpeg?auto=compress&cs=tinysrgb&w=1600" />

  
  </div>
  <div className={styles.column}>
  <img src="" />
   
    <img src="https://cdn.pixabay.com/photo/2017/08/07/20/48/animals-2607704__340.jpg" />
    <img src="https://cdn.pixabay.com/photo/2021/09/26/18/26/snake-6658527__340.jpg"/> 
    <img src="https://images.pexels.com/photos/982865/pexels-photo-982865.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <img src="https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <img src="https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1600" className={styles.dogImage} />
  </div>
</div>
</div>
    </div>
  <div>
 
  </div>
    </>
  )
}
