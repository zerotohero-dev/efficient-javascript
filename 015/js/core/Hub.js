define([
    'core/Config',
    'core/PubSub',
    'utils/Debug',
    'utils/Dom',
    'i18n/Bundle'
], function(
    Config,
    PubSub,
    Debug,
    Dom,
    i18n
) {
    var tasks      = [],
        modules    = {},
        event      = Config.event,
        moduleName = Config.moduleName,
        selector   = Config.selector,
        log        = Debug.log,
        trace      = Debug.trace;

    /**
     *
     */
    function destructAllTasks() {
        modules[moduleName.MAIN_PAGE_VIEW].destructAllTasks();
    }

    /**
     *
     */
    function appendMainModuleToDom() {
        modules[moduleName.MAIN_PAGE_VIEW].appendSelfToDom();
    }

    /**
     *
     */
    function removeTask(id) {
        modules[moduleName.MAIN_PAGE_VIEW].removeTask(id);
    }

    /**
     *
     */
    function resetMainPageViewContainer() {
        modules[moduleName.MAIN_PAGE_VIEW].resetContainer();
    }

    /**
     *
     */
    function appendNewTask(model, shouldScroll) {
        modules[moduleName.MAIN_PAGE_VIEW].appendNewTask(model, shouldScroll);
    }

    /**
     *
     */
    function addRandomTask() {
        modules[moduleName.MAIN_COLLECTION_VIEW].addRandomTask();
    }

    /**
     *
     */
    function renderToDoCollection() {
        modules[moduleName.MAIN_COLLECTION_VIEW].render();
    }

    function adjustScrollPosition() {
            // ?
//            setTimeout(function() {
                window.document.body.scrollTop =
                    window.document.documentElement.scrollHeight;
  //          }, 0);
    }

    /**
     *
     */
    return {

        /**
         *
         */
        register : function(name, module) {
            modules[name] = module;
        },

        /**
         *
         */
        initialize : function() {
            PubSub.subscribe(this, event.ADD_RANDOM_TASK_TRIGGERED);
            PubSub.subscribe(this, event.BOOTSTRAP_COMPLETE);
            PubSub.subscribe(this, event.DELETE_TASK_TRIGGERED);
            PubSub.subscribe(this, event.PAGE_VIEW_RENDERED);
            PubSub.subscribe(this, event.RECEIVED_NEW_TASK);
            PubSub.subscribe(this, event.RENDER_BATCH_STARTED);
            PubSub.subscribe(this, event.REMOVE_ALL_TASKS_TRIGGERED);
            PubSub.subscribe(this, event.TASK_DESTRUCTED);
            PubSub.subscribe(this, event.TASK_INITIALIZED);
            PubSub.subscribe(this, event.TASK_APPENDED);
        },

        /**
         *
         */
        notify : function(message, sender, evtArgs) {
            switch (message) {
                case event.RECEIVED_NEW_TASK:
                    trace('>>>event.RECEIVED_NEW_TASK');

                    var task = evtArgs.pop();

                    appendNewTask(task, !!task.isRandom);

                    trace('<<<event.RECEIVED_NEW_TASK');

                    break;
                case event.RENDER_BATCH_STARTED:
                    log('>>>event.RENDER_BATCH_STARTED');

                    resetMainPageViewContainer();

                    log('<<<event.RENDER_BATCH_STARTED');

                    break;

                case event.TASK_INITIALIZED:
                    trace('>>>event.TASK_INITIALIZED<<<');

                    break;
                case event.TASK_DESTRUCTED:
                    log('>>>event.TASK_DESTRUCTED');

                    spliceDestructedTask(sender);

                    log('<<<event.TASK_DESTRUCTED');

                    break;
                case event.BOOTSTRAP_COMPLETE:
                    log('>>>event.BOOTSTRAP_COMPLETE');

                    appendMainModuleToDom();

                    log('<<<event.BOOTSTRAP_COMPLETE');

                    break;
                case event.REMOVE_ALL_TASKS_TRIGGERED:
                    log('>>>event.REMOVE_ALL_TASKS_TRIGGERED');

                    destructAllTasks();

                    log('<<<event.REMOVE_ALL_TASKS_TRIGGERED');

                    break;
                case event.ADD_RANDOM_TASK_TRIGGERED:
                    log('>>>event.ADD_RANDOM_TASK_TRIGGERED');

                    addRandomTask();

                    log('<<<event.ADD_RANDOM_TASK_TRIGGERED');

                    break;
                case event.PAGE_VIEW_RENDERED:
                    log('>>>event.PAGE_VIEW_RENDERED');

                    renderToDoCollection();

                    log('<<<event.PAGE_VIEW_RENDERED');

                    break;
                case event.DELETE_TASK_TRIGGERED:
                    log('>>>event.DELETE_TASK_TRIGGERED');

                    removeTask(evtArgs.pop());

                    log('<<<event.DELETE_TASK_TRIGGERED');

                    break;
                case event.TASK_APPENDED:
                    log('>>>event.TASK_APPENDED');

                    adjustScrollPosition();

                    log('<<<event.TASK_APPENDED');

                    break;
                default:
                    log.warn('Hub: Unknown message: "' + message + '"');

                    break;
            }
        },

        /**
         * @function {private} Hub._getModules
         */
        _getModules : function() {
            return modules;
        }
    }
});