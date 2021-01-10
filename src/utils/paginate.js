import _ from 'lodash';

import Pagination from '../components/common/pagination';

export function paginate (items,pageNumber,pageSize){
    const startIndex = (pageNumber-1) * pageSize ;
    return _(items).slice(startIndex).take(pageSize).value();
}

