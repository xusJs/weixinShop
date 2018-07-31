# shop

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).






   saveFile(obj, name) {
        if (window.requestFileSystem !== undefined) {
            console.debug('use window.requestFileSystem');
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                fileSystem.root.getDirectory('Download', {create: true}, function (dirTry) {
                    dirTry.getFile(name, {create: true, exclusive: false}, function (entry) {
                        let fileUrl = entry.toURL();
                        entry.createWriter(function (writer) {
                            writer.onwriteend = function (evt) {
                                //console.debug("Successfully saved file to " + fileUrl);
                                NotificationActions.success("Successfully saved file to " + fileUrl);
                            };
                            // Write to the file
                            writer.write(obj);
                        }, function (error) {
                            //console.debug("Error: Could not create file writer, " + error.code);
                            NotificationActions.error("Could not create file writer, " + error.code);
                        });
                    }, function (error) {
                        //console.debug("Error: Could not create file, " + error.code);
                        NotificationActions.error("Could not create file, " + error.code);
                    });
                }, function (error) {
                    NotificationActions.error("Could not create dir, " + error.code);
                });
            }, function (evt) {
                //console.debug("Error: Could not access file system, " + evt.target.error.code);
                NotificationActions.error("Could not access file system, " + evt.target.error.code);
            });
        } else {
            console.debug('not window.requestFileSystem');
            saveAs(obj, name);
        }
    }
