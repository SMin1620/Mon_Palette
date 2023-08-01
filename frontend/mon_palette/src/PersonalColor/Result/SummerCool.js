import React from 'react';
import styles from './SummerCool.module.css';
import { Link } from 'react-router-dom';


const SummerCool = () => {
    const BackendResponseExample = () => {
      return(
    <div className={styles['backend-response-container']}>
        <div className={styles['backend-response']}>
            summer
        </div>
        <div className={styles['backend-response']}>
            cool
        </div>
    </div>
    )
  }
    const BackendResponseDescription = () => {
      return (
      <div className={styles['result-description']}>
        <div className={styles.description}>
        Additional information and description about the result can go here.
        Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.
        </div>
    </div>
      )
    };

    return (
      <div className={styles.div}>
            <div className={styles.container}>
              <div className={styles.page1}>
                <div className={styles['text-container']}>
                  <div className={styles.text1}>Your</div>
                  <div className={styles.text}>Palette</div>
                  <div className={styles.text}>is...</div>
                </div>
                <BackendResponseExample />
              </div>
            </div>
              <div className={styles['backend-response-scroll']}>
                <BackendResponseExample />
                <div className={styles.image}></div>
                <BackendResponseDescription />
              </div>  
                <Link className={styles.button}>
                  <button className={styles.button2}>
                    Restart
                  </button>
                </Link>
            </div>
          )
};

export default SummerCool;





