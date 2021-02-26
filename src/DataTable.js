import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import ApplicationPagination from './Pagination';
import {
    fetchApiList,
    onChangePageId,
    onUpdateDataList
} from './store/dispatchers';
import './DataTable.scss';

function Screens({
    limit,
    pageId,
    dataList,
    fetchApiList,
    onChangePageId,
    onUpdateDataList
}) {
    const [selectedId, setSelectedId] = useState(null);
    const [title, setEditAndSave] = useState("");

    const totalPage = Math.ceil(5000 / limit);
    const _pageId = pageId === 1 ? 0 : ((pageId - 1) * limit);

    useEffect(() => {
        fetch(`http://jsonplaceholder.typicode.com/photos?_start=${_pageId}&_limit=${limit}`)
            .then(response => response.json())
            .then(data => fetchApiList(data))
    }, [_pageId]);

    const onDelete = (e) => {
        const updatedList = dataList.filter((value) => parseInt(value.id) !== parseInt(e.target.value))
        onUpdateDataList(updatedList);
    }
    const onEdit = (e) => {
        const updateEditStatus = dataList.map((value) => {
            if (parseInt(value.id) === parseInt(e.target.value)) {
                value.editable = true
            }
            return value;
        });
        setSelectedId(e.target.value);
        onUpdateDataList(updateEditStatus);
    }
    const onEditTitle = (e) => {
        setEditAndSave(e.target.value)
    }

    const onClickSave = (e) => {
        if (title !== "") {
            const updateTitleValue = dataList.map((value) => {
                if (parseInt(value.id) === parseInt(selectedId)) {
                    value.editable = false
                    value.title = title
                }
                return value;
            });
            onUpdateDataList(updateTitleValue)
        } else {
            const updateTitleValue = dataList.map((value) => {

                value.editable = false


                return value;
            });
            onUpdateDataList(updateTitleValue)
        }


    }
    return (
        <div className="App">
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Thumbnail Icon</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList && dataList.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th>{value.id}</th>
                                    <th>
                                        <img className="icon-img" src={value.thumbnailUrl} alt="image" />
                                    </th>
                                    <th>
                                        {
                                            value.editable
                                                ? <>
                                                    <textarea
                                                        className="title-textarea"
                                                        defaultValue={value.title}
                                                        onChange={(e) => onEditTitle(e)} />

                                                    <Button
                                                        value={value.id}
                                                        outline color="success"
                                                        onClick={(e) => onClickSave(e)}>
                                                        Save
                                                    </Button>
                                                </>

                                                : <pre>{value.title}</pre>
                                        }
                                    </th>
                                    <th className="url">
                                        <a href={value.url} target="_blank"> {value.url} </a>
                                    </th>
                                    <th className="action-buttons">
                                        <Button
                                            value={value.id}
                                            outline color="info"
                                            disabled={value.editable ? true : false}
                                            onClick={(e) => onEdit(e)}>
                                            Edit
                                        </Button>
                                        <Button
                                            value={value.id}
                                            outline color="danger"
                                            onClick={(e) => onDelete(e)}>
                                            Delete
                                        </Button>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                dataList && dataList.length > 0 ?
                    <ApplicationPagination
                        pageId={pageId}
                        total={totalPage}
                        _onPaginate={onChangePageId}
                    /> : null
            }

        </div>
    );
}

const mapStateToProps = ({ app }) => {
    return {
        limit: app.limit,
        pageId: app.pageId,
        dataList: app.dataList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchApiList(data) {
            dispatch(fetchApiList(data));
        },
        onChangePageId(data) {
            dispatch(onChangePageId(data))
        },
        onUpdateDataList(data) {
            dispatch(onUpdateDataList(data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);
