import React from 'react';
import styles from './ResultPage.module.css';
import { Link } from 'react-router-dom'

const BackendResponseExample = () => {
  // 예시로 받아온 값
  const responseValue = 'spring warm';
  // 받아온 값을 공백으로 분리하여 배열로 저장
  const responseArray = responseValue.split(' ');

  return (
    <div className={styles['backend-response-container']}>
      {responseArray.map((word, index) => (
        <div key={index} className={styles['backend-response']}>
            {word}
        </div>
      ))}
    </div>
  );
};

const BackendResponseDescription = () => {
  return <div className={styles['result-description']}>
        Additional information and description about the result can go here.
        Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.
        Next level tbh everyday carry, blog copper mug forage kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch 8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke bicycle rights brunch before they sold out ramps. Twee shabby chic taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical banh mi narwhal echo park cronut.
      </div>
};

const ResultPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.page1}>
        <div className={styles['text-container']}>
          <div className={styles.text}>Your</div>
          <div className={styles.text}>Palette</div>
          <div className={styles.text}>is...</div>
        </div>
        <div >
          <BackendResponseExample/>
        </div>
      </div>
      <div className={styles['backend-response-scroll']}>
        <BackendResponseExample />
        <BackendResponseDescription />
        <Link className={styles.button}>
          <button className={styles.button2}>
            Restart
          </button>
        </Link>
      </div>  
    </div>
  );
};


export default ResultPage;
