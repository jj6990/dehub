import React from 'react';

export const Show = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='background'>
          <img
            src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132206/news-slider/background.jpg'
            alt=''
          />
        </div>
        <div className='item-bg'></div>

        <div className='news-slider'>
          <div className='news-slider__wrp swiper-wrapper'>
            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>24</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-2.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>

            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>25</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-3.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>

            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>26</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-4.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>

            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>27</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-2.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>

            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>28</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-5.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>

            <div className='news-slider__item swiper-slide'>
              <a href='#' className='news__item'>
                <div className='news-date'>
                  <span className='news-date__title'>29</span>
                  <span className='news-date__txt'>May</span>
                </div>
                <div className='news__title'>Lorem Ipsum Dolor Sit Amed</div>

                <p className='news__txt'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className='news__img'>
                  <img
                    src='https://res.cloudinary.com/muhammederdem/image/upload/v1537132205/news-slider/item-4.jpg'
                    alt='news'
                  />
                </div>
              </a>
            </div>
          </div>

          <div className='news-slider__ctr'>
            <div className='news-slider__arrows'>
              <button className='news-slider__arrow news-slider-prev'>
                <span className='icon-font'>
                  <svg className='icon icon-arrow-left'>
                    <use href='#icon-arrow-left'></use>
                  </svg>
                </span>
              </button>
              <button className='news-slider__arrow news-slider-next'>
                <span className='icon-font'>
                  <svg className='icon icon-arrow-right'>
                    <use href='#icon-arrow-right'></use>
                  </svg>
                </span>
              </button>
            </div>

            <div className='news-slider__pagination'></div>
          </div>
        </div>
      </div>

      <svg hidden='hidden'>
        <defs>
          <symbol id='icon-arrow-left' viewBox='0 0 32 32'>
            <title>arrow-left</title>
            <path d='M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z'></path>
          </symbol>
          <symbol id='icon-arrow-right' viewBox='0 0 32 32'>
            <title>arrow-right</title>
            <path d='M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z'></path>
          </symbol>
        </defs>
      </svg>
    </div>
  );
};
export default Show;
