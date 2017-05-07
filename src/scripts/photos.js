import React from 'react';
import Lightbox from 'react-images';


export default class Sample extends React.Component {

  render() {
    return (
      <Lightbox
        images={[{ src: 'https://unsplash.it/200/300' }, { src: 'https://unsplash.it/200/300' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    );
  }
}