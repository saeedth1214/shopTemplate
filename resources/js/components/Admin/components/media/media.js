import React, { Fragment } from 'react';
import AddMedia from './addMedia';
import MediaList from './mediaList';
const Media = () => {
    return (
        <Fragment>
            <MediaList />
            <AddMedia />
        </Fragment>
    )
}
export default Media;