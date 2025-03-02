    function deleteMessage() {
        // 获取按钮元素
        const moreBtn = document.querySelectorAll('.tp.bili-dyn-more__btn')[0];
        
        // 创建一个模拟鼠标进入的事件
        const mouseEnterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            cancelable: true
        });
        // 触发鼠标进入事件，显示更多内容
        moreBtn.dispatchEvent(mouseEnterEvent);
        if (moreBtn) {
            setTimeout(() => {
                const labels = document.querySelectorAll('.bili-cascader-options__item-label');
                for (const label of labels) {
                    if (label.textContent.includes('删除')) {
                        label.click();
                        console.log('delete clicked')
                        break;
                    }
                }

            }, 30)
            setTimeout(() => {
                // 确认删除框 确认点击
                let confirm = document.querySelectorAll('.bili-modal__button.confirm.red')[0];
                if (confirm) {
                    confirm.click();
                    console.log('deleted confirmed')
                }
            }, 300)

            setTimeout(() => {
                // 重复执行
                deleteMessage()
            }, 1000)
        }
    }
    // 执行
    deleteMessage()