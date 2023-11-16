import {observer} from "mobx-react";
import {observable} from "mobx";

import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useRouter} from 'next/router';
import api from "@/api";
import css from './todoList.module.scss';
import Image from "next/image";
import {
    Button,
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Hidden,
    Stack, ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {Big} from "big.js";
import NumberInput from "@/pages/components/numberInput/numberInput";
import Message from "@/pages/components/message/message";
import message from "@/pages/components/message/message";
import TextField from "@mui/material/TextField";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";


let commonUtils = require("@/utils/Common.js");
let queryParams = {};
let history;
let router;
let data = observable({
    todo_list: [
        {
            title: 'Lorem ipsum dolor',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            tags: ['Health', 'Life'],
            level: 1,
            is_done: false,
        }
    ],
    form_todo_item: {
        title: '',
        content: '',
        tags: [],
        level: 1,
        is_done: false,
    } as any,
    choose_item: {
        title: '',
        content: '',
        tags: [],
        level: 1,
        is_done: false,
    } as any,
    is_show_add_todo_item_dialog: false,
});

//添加todoItem
async function addTodoItem() {
    if (commonUtils.isEmpty(data.form_todo_item.title)
        || commonUtils.isEmpty(data.form_todo_item.content)
        || commonUtils.isEmpty(data.form_todo_item.tags)) {
        Message.error("please fill in the form");
        return;
    }
    data.todo_list.push(data.form_todo_item);
    message.success("add success");
    data.is_show_add_todo_item_dialog = false;
}

//删除todoItem
async function deleteTodoItem() {
    let index = data.todo_list.indexOf(data.choose_item);
    if (index === -1) {
        message.error("please choose item");
        return;
    }
    data.todo_list.splice(index, 1);
    message.success("delete success");
}

//修改todoItem
async function updateTodoItem(params: any) {
    let index = data.todo_list.indexOf(data.choose_item);
    if (index === -1) {
        message.error("please choose item");
        return;
    }
    Object.assign(data.todo_list[index], params);
    message.success("update success");
}

function get_level_color(level: number): any {
    //'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    let level_colors = [
        {level: 1, color: 'error'},
        {level: 2, color: 'warning'},
        {level: 3, color: 'info'},
        {level: 4, color: 'success'},
    ];
    let level_color = level_colors.find((item: any) => item.level === level);
    return level_color ? level_color.color : 'default';
}


function init(queryParams: {}) {
    //把todo_list里面的数据，复制20份，用于测试滚动加载

    for (let i = 0; i < 5; i++) {
        data.todo_list.push({
            title: 'Lorem ipsum dolor',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            tags: ['Health', 'Life'],
            level: 1,
            is_done: false,
        });
    }
}

// 拖拽的 Card 组件
const DraggableCard = ({item, onDrop, children}: any) => {
    const [{isDragging}, dragRef] = useDrag({
        type: 'CARD',
        item,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                // onDrop(item);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return <div ref={dragRef}>{children}</div>;
};

// Drop 区域
const DropZone = ({name, onDrop, children, className}: any) => {
    const [, dropRef] = useDrop({
        accept: 'CARD',
        drop: onDrop,
    });

    return <div ref={dropRef} className={className}>{children}</div>;
};


let TodoList = observer(() => {
    history = useHistory();
    router = useRouter();
    queryParams = router.query;
    // console.log(JSON.parse(JSON.stringify(router)));

    useEffect(() => {
        init(queryParams);
    }, []);

    return (
        <div className={css.container}>
            <div className={css.topFade}></div>
            <div className={css.topTitle}>Daily Todo</div>

            <DndProvider backend={HTML5Backend}>
                <div className={css.middleBox}>
                    {
                        !commonUtils.isEmpty(data.choose_item?.title) ? (
                            <DropZone name="delete" onDrop={deleteTodoItem} className={css.leftDeleteIcon}>
                                <Image src={'/todoList/delete_icon.png'} alt="" width={129} height={129}/>
                            </DropZone>
                        ) : null
                    }
                    <div className={css.todoListBox}>
                        {
                            data.todo_list.map((item: any, index: number) => {
                                return (
                                    <DraggableCard key={index} item={item}>
                                        <Card
                                            className={css.todoItem}
                                            onMouseEnter={() => {
                                                data.choose_item = item;
                                            }}
                                            onClick={() => {
                                                if (commonUtils.isEmpty(data.choose_item?.title)) {
                                                    data.choose_item = item;
                                                } else {
                                                    data.choose_item = null;
                                                }
                                            }}
                                            // onMouseLeave={() => {
                                            //     data.choose_item = null;
                                            // }}
                                            style={{
                                                transform: data.todo_list.indexOf(data.choose_item) === index ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'transform 0.3s'
                                            }}
                                        >
                                            <div className={css.title}>{item.title}</div>
                                            <div className={css.content}>{item.content}</div>
                                            <div className={css.tagsBox}>
                                                <Chip label={item.level} color={get_level_color(item.level)}/>
                                                <Stack direction="row" spacing={1}>
                                                    {
                                                        item.tags?.map((tag: string, index: number) => {
                                                            return (
                                                                <Chip label={tag} key={index} color="success"/>
                                                            )
                                                        })
                                                    }
                                                </Stack>

                                                <div>{item.is_done ? 'done' : 'not done'}</div>
                                            </div>
                                        </Card>
                                    </DraggableCard>
                                )
                            })
                        }
                    </div>
                    {
                        !commonUtils.isEmpty(data.choose_item?.title) ? (
                            <DropZone name="complete" onDrop={() => {
                                updateTodoItem({is_done: !data.choose_item.is_done})
                            }} className={css.rightIcon}>
                                <Image src={'/todoList/right_icon.png'} alt="" width={129} height={129}/>
                            </DropZone>
                        ) : null
                    }
                </div>

            </DndProvider>
            <div className={css.bottomFade}></div>
            <div>
                {
                    !data.is_show_add_todo_item_dialog ? (
                        <div className={css.closeImg} onClick={() => {
                            data.is_show_add_todo_item_dialog = true;
                        }}>
                            <Image src={'/todoList/add_icon.png'} alt="" width={16} height={16}/>
                        </div>
                    ) : null
                }
            </div>

            <Dialog open={data.is_show_add_todo_item_dialog}>
                <DialogTitle>add info</DialogTitle>
                <DialogContent>
                    <TextField label="title"
                               placeholder="Take dog out on walk"
                               value={data.form_todo_item.title} onChange={(e) => {
                        data.form_todo_item.title = e.target.value;
                    }}/>
                    <TextField label="content"
                               placeholder="He needs vaccine shot too"
                               value={data.form_todo_item.content} onChange={(e) => {
                        data.form_todo_item.content = e.target.value;
                    }}/>
                    <TextField label="tags"
                               placeholder="Tags"
                               value={data.form_todo_item.tags} onChange={(e) => {
                        //用逗号或者空格分割
                        let tags = e.target.value.split(/[, ]+/);
                        data.form_todo_item.tags = tags;
                    }}/>
                    <div>
                        <ToggleButtonGroup
                            value={data.form_todo_item.level}
                            exclusive
                            onChange={(e, value) => {
                                data.form_todo_item.level = value;
                            }}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="1" aria-label="left aligned">
                                1
                            </ToggleButton>
                            <ToggleButton value="2" aria-label="centered">
                                2
                            </ToggleButton>
                            <ToggleButton value="3" aria-label="right aligned">
                                3
                            </ToggleButton>
                            <ToggleButton value="4" aria-label="justified">
                                4
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className={css.closeImg} onClick={() => {
                        data.is_show_add_todo_item_dialog = false;
                    }}>
                        <Image src={'/todoList/small_close.svg'} alt="" width={16} height={16}/>
                    </div>
                    <div className={css.closeImg} onClick={() => {
                        addTodoItem();
                    }}>
                        <Image src={'/todoList/small_right.svg'} alt="" width={16} height={16}/>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default TodoList;

