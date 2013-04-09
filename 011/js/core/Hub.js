define([
    'core/Config',
    'core/PubSub',
    'utils/Debug',
    'views/ToDoView',
], function(
    Config,
    PubSub,
    Debug,
    ToDoView
) {
    var tasks      = [],
        modules    = {},
        event      = Config.event,
        moduleName = Config.moduleName,
        subscribe  = PubSub.subscribe,
        log        = Debug.log,
        trace      = Debug.trace;

    /**
     *
     */
    function destructAllTasks() {
        var i, len;

        for(i = 0, len = tasks.length; i < len; i++) {
                tasks[i].destruct();
                i--;
                len = tasks.length;
        }

        tasks = [];
    }

    /**
     *
     */
    function spliceDestructedTask(task) {
        var i, len;

        for (var i = 0, len = tasks.length; i < len; i++) {
            if (task === tasks[i]) {
                tasks.splice(i, 1);

                break;
            }
        }
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
    function addTask(task) {
        tasks.push(task);
    }

    /**
     *
     */
    function removeTask(id) {
        var i, len, task;

        for (i = 0, len = tasks.length; i < len; i++) {
            task = tasks[i];

            if (task.model.get('id') === id) {

                task.destruct();

                break;
            }
        }
    }

    /**
     *
     */
    function emptyTasks() {
        tasks = [];
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
    function appendNewTask(model) {
        modules[moduleName.MAIN_PAGE_VIEW].appendTask(
            (new ToDoView({model : model})).render().el
        );
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
            subscribe(this, event.ADD_RANDOM_TASK_TRIGGERED);
            subscribe(this, event.BOOTSTRAP_COMPLETE);
            subscribe(this, event.DELETE_TASK_TRIGGERED);
            subscribe(this, event.PAGE_VIEW_RENDERED);
            subscribe(this, event.RECEIVED_NEW_TASK);
            subscribe(this, event.RENDER_BATCH_STARTED);
            subscribe(this, event.REMOVE_ALL_TASKS_TRIGGERED);
            subscribe(this, event.TASK_DESTRUCTED);
            subscribe(this, event.TASK_INITIALIZED);
        },

        /**
         *
         */
        notify : function(message, sender, evtArgs) {
            switch (message) {
                case event.RECEIVED_NEW_TASK:
                    trace('>>>event.RECEIVED_NEW_TASK');

                    appendNewTask(evtArgs.pop());

                    trace('<<<event.RECEIVED_NEW_TASK');

                    break;
                case event.RENDER_BATCH_STARTED:
                    log('>>>event.RENDER_BATCH_STARTED');

                    resetMainPageViewContainer();

                    log('<<<event.RENDER_BATCH_STARTED');

                    break;

                case event.TASK_INITIALIZED:
                    trace('>>>event.TASK_INITIALIZED');

                    addTask(sender);

                    trace('<<<event.TASK_INITIALIZED');

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

                    emptyTasks();
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
                default:
                    log.warn('Hub: Unknown message: "' + message + '"');

                    break;
            }
        },

        /**
         * @function {private} Hub._getTasks
         */
        _getTasks : function() {
            return tasks;
        },

        /**
         * @function {private} Hub._getModules
         */
        _getModules : function() {
            return modules;
        }
    }
});