common.factory('canvasService', ["settings", "$q", "$window", "toolService", "wallService", "siteService",
    function (settings, $q, $window, tools, wallService, siteService) {

        var zoom = 1;

        var canvasOffsetX = 0;
        var canvasOffsetY = 0;

        var predefinedWallAngles = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360];

        var element;
        var canvas;
        var ctx;
        var attributes;
        var drawType;

        //map elements
        var site;
        var walls;
        var switches;

        var wall = function (type, x, y, length, angle) {
            this.type = type;
            this.x = x;
            this.y = y;

            this.length = length;
            this.angle = angle;
        };

        var panMode = false;
        var isDrawing = false;
        var currentWall = null;


        // variable that decides if something should be drawn on mousemove
        var eventStarted = false;

        // the last coordinates before the current move
        var lastX;
        var lastY;

        //var mousePos = { x: 0, y: 0 };

        // Get the position of the mouse relative to the canvas
        var getMousePos = function (canvasDom, mouseEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - rect.left,
                y: mouseEvent.clientY - rect.top
            };
        }

        // canvas reset
        var reset = function () {
            canvas.clear();
            //canvas.renderAll();
        }

        var getDoubleLine = function (x, y, length, angle, theWall) {
            var line1 = new fabric.Line([(x - 2), y, (x - 2) , (y + length)], {
                stroke: attributes.strokeStyle,
                strokeWidth: 2,
            });

            var line2 = new fabric.Line([(x + 2), y, (x + 2) , (y + length)], {
                stroke: attributes.strokeStyle,
                strokeWidth: 2,
            });

            var group = new fabric.Group([line1, line2], {
                targetFindTolerance: true,
                hasRotatingPoint: false,
                lockScalingX: true,
                angle: angle,
                hasBorders: false,
                cornerColor: 'red',
                wall: theWall,
                snapAngle: 15,
                
            });
            group.setControlsVisibility({ 'tl': false, 'tr': false, 'ml': false, 'mr': false, 'bl': false, 'br': false, });
            group.set('padding', 5);

            return group;
        }

        var getSingleLine = function(x, y, length, angle, theWall) {
            var line = new fabric.Line([x , y , x, (y + length)], {
                targetFindTolerance: true,
                angle: angle,
                stroke: attributes.strokeStyle,
                strokeWidth: 2,
                hasRotatingPoint: false,
                lockScalingX: true,
                hasBorders: false,
                cornerColor: 'red',
                wall: theWall,
                snapAngle: 15,
                
            });

            line.setControlsVisibility({ 'tl': false, 'tr': false, 'ml': false, 'mr': false, 'bl': false, 'br': false, });
            line.set('padding', 5);
            return line;
        }

        var resizeCanvas = function() {
            if ($window.innerWidth > 767) {
                canvas.setHeight($window.innerHeight - 306);
                if ($window.innerWidth >= 1200) {
                    canvas.setWidth(1140);
                } else if ($window.innerWidth >= 992) {
                    canvas.setWidth(940);
                } else{
                    canvas.setWidth(720);
                }
            } else {
                canvas.setHeight($window.innerHeight - 90);
                canvas.setWidth($window.innerWidth);
            }
        }

        var getPointFromEvent = function(event) {
            var x = 0, y = 0;
            if (event.e instanceof MouseEvent) {
                x = event.e.clientX;
                y = event.e.clientY;
            } else if (event.e instanceof TouchEvent) {
                x = event.e.touches[0].clientX;
                y = event.e.touches[0].clientY;
            }

            return { x: x, y: y };
        }


        var registerEvents = function () {

            canvas.on({
                'mouse:move': function(event) {
                    
                    if (drawType != "doublewall" && drawType != "wall") {
                        var point = getPointFromEvent(event);

                        if (panMode && !canvas.getActiveGroup() && !canvas.getActiveObject()) {

                            var delta = new fabric.Point(point.x - lastX, point.y - lastY);
                            canvasOffsetX -= point.x - lastX;
                            canvasOffsetY -= point.y - lastY;
                            var absolutePoint = new fabric.Point(canvasOffsetX, canvasOffsetY);
                            //canvas.getItem(0).setPosition(delta);
                            console.log("moved to:" + canvasOffsetX + "," + canvasOffsetY);
                            canvas.relativePan(delta);
                            lastX = point.x;
                            lastY = point.y;

                        }
                    } else if (isDrawing && canvas.getActiveObject()) {

                        var drawPoint = canvas.getPointer(event.e);

                        var dx = drawPoint.x - lastX;
                        var dy = drawPoint.y - lastY;

                        var length = Math.sqrt(dx * dx + dy * dy);

                        var angle = Math.asin(dx / length) * 180 / Math.PI;

                        

                        if (dy < 0) {
                            angle = angle + 180;
                        } else {
                            angle = -angle;
                        }

                        if (angle > 360) {
                            angle = angle - 360;
                        }
                        if (angle < 0) {
                            angle = angle + 360;
                        }

                        var matchedAngle = tools.closest(angle, predefinedWallAngles);

                        var object = canvas.getActiveObject();

                        object.scaleY = length;

                        object.angle = matchedAngle;

                        canvas.renderAll();
                    }
                },
                'mouse:down': function (event) {
                    
                    if (drawType != "doublewall" && drawType != "wall") {
                        var panPoint = getPointFromEvent(event);
                        panMode = true;
                        lastX = panPoint.x;
                        lastY = panPoint.y;
                    } else if (!canvas.getActiveGroup() && !canvas.getActiveObject()) {
                        var drawPoint = canvas.getPointer(event.e);

                        lastX = drawPoint.x;
                        lastY = drawPoint.y;

                        isDrawing = true;
                        var line;
                        if (drawType == "doublewall") {
                            line = getDoubleLine(lastX, lastY, 1, 0, null);
                        } else {
                            line = getSingleLine(lastX, lastY, 1, 0, null);
                        }
                        //line.set('active', true);
                        canvas.setActiveObject(line);
                        canvas.add(line);
                        
                    }
                    
                    
                    
                },
                'mouse:up': function (event) {
                    if (drawType != "doublewall" && drawType != "wall") {
                        panMode = false;
                    } else if (isDrawing) {
                        var object = canvas.getActiveObject();

                        if (object != null) {
                            console.log(object);
                            var newWall = new wall(drawType == "doublewall" ? 2 : 1, object.left, object.top, object.height * object.scaleY, object.angle);
                            newWall.isDirty = true;
                            walls.push(newWall);

                        }


                        isDrawing = false;
                    }
                },

                
                'touch:gesture': function (event) {
                    // Handle zoom only if 2 fingers are touching the screen
                    if (event.e.touches && event.e.touches.length == 2) {
                        // Get event point
                        var point = new fabric.Point(event.self.x, event.self.y);
                        var scale = event.self.scale;
                        if (scale > 1) {
                            zoomInToPoint(point);
                        } else if (scale < 1) {
                            zoomOutToPoint(point);
                        }
                    }
                },
                'object:modified': function (event) {
                    if (event.target && event.target.wall && event.target.wall.id) {
                        
                        event.target.wall.x = event.target.left;
                        event.target.wall.y = event.target.top;
                        event.target.wall.length = event.target.height * event.target.scaleY;
                        event.target.wall.angle = event.target.angle;
                        event.target.wall.isDirty = true;

                        //wallService.updateWall(event.target.wall.id, event.target.left, event.target.top, event.target.height * event.target.scaleY, event.target.angle, event.target.wall.siteId);
                    }
                },
                'mouse:wheel': function (event) {
                    
                    if (event.e instanceof WheelEvent) {
                        if (event.e.wheelDeltaY > 0) {
                            zoomInToPoint(new fabric.Point(event.e.clientX, event.e.clientY));
                        } else {
                            zoomOutToPoint(new fabric.Point(event.e.clientX, event.e.clientY));
                        }
                    }
                    console.log(event);
                }
            });

            //canvas.on({
            //    'touch:gesture': function (event) {
            //        console.log("gestrue");
            //    },
            //    'touch:drag': function (event) {
            //        if (!canvas.getActiveGroup() && !canvas.getActiveObject()) {
            //            if (event.e instanceof MouseEvent) {
            //                console.log(event.e);
            //                if (event.e.type === "mousedown") {
                                
            //                }
            //                else {
                                
            //                }
            //            }
            //            //if (event.e.movementX && event.e.movementY) {

            //            //    var deltaMouse = new fabric.Point(event.e.movementX, event.e.movementY);
            //            //    canvas.relativePan(deltaMouse);
            //            //    canvasOffsetX -= event.e.movementX;
            //            //    canvasOffsetY -= event.e.movementY;
            //            //    //renderMap();
            //            //}
            //            //else if (event.e.touches && event.e.touches.length == 1) {

            //            //    if (event.e.type == "touchstart") {
            //            //        lastX = event.e.touches[0].clientX;
            //            //        lastY = event.e.touches[0].clientY;
            //            //    } else {
            //            //        var deltaTouch = new fabric.Point(event.e.touches[0].clientX - lastX, event.e.touches[0].clientY - lastY);
            //            //        canvas.relativePan(deltaTouch);
            //            //        canvasOffsetX -= event.e.touches[0].clientX - lastX;
            //            //        canvasOffsetY -= event.e.touches[0].clientY - lastY;
            //            //        lastX = event.e.touches[0].clientX;
            //            //        lastY = event.e.touches[0].clientY;
            //            //    }
                            
                            



            //            //    //renderMap();
            //            //}
                        
            //        }
                    
            //    },
            //    'touch:orientation': function () {
            //        console.log("touch:orientation");
            //    },
            //    'touch:shake': function () {
            //        console.log("shake");
            //    },
            //    'touch:longpress': function () {
            //        console.log("longpress");
            //    }
            //});

            //var upperCanvas = document.getElementsByClassName("upper-canvas")[0];

            //upperCanvas.addEventListener("touchstart", function (e) {
            //    //mousePos = getMousePos(canvas, e);
            //    var touch = e.touches[0];
            //    var mouseEvent = new MouseEvent("mousedown", {
            //        clientX: touch.clientX,
            //        clientY: touch.clientY
            //    });
            //    upperCanvas.dispatchEvent(mouseEvent);
            //}, false);

            //element[0].addEventListener("touchend", function (e) {
            //    var mouseEvent = new MouseEvent("mouseup", {});
            //    element[0].dispatchEvent(mouseEvent);
            //}, false);

            //element[0].addEventListener("touchmove", function (e) {
            //    var touch = e.touches[0];
            //    console.log(e);
            //    var mouseEvent = new MouseEvent("mousemove", {
            //        clientX: touch.clientX,
            //        clientY: touch.clientY
            //    });
            //    element[0].dispatchEvent(mouseEvent);
            //}, false);


            //// Prevent scrolling when touching the canvas
            //document.body.addEventListener("touchstart", function (e) {
            //    if (e.target == upperCanvas) {
            //        e.preventDefault();
            //    }
            //}, false);
            //document.body.addEventListener("touchend", function (e) {
            //    if (e.target == upperCanvas) {
            //        e.preventDefault();
            //    }
            //}, false);
            //document.body.addEventListener("touchmove", function (e) {
            //    if (e.target == upperCanvas) {
            //        e.preventDefault();
            //    }
            //}, false);


            //element.bind('mousedown', function (event) {

            //    eventStarted = true;
            //    if (drawType == 'hand') {
            //        lastX = event.offsetX;
            //        lastY = event.offsetY;
            //    } else if (drawType == "wall" || drawType == "doublewall") {
            //        startDrawingWall(event);
            //    }
            //});

            //element.bind('mousemove', function (event) {
            //    if (eventStarted) {
            //        if (drawType == 'hand') {
            //            canvasOffsetX -= event.offsetX - lastX;
            //            canvasOffsetY -= event.offsetY - lastY;
            //            tools.log("canvasOffset:" + canvasOffsetX + "," + canvasOffsetY);
            //            lastX = event.offsetX;
            //            lastY = event.offsetY;
            //            renderMap();
            //        } else if (drawType == "wall" || drawType == "doublewall") {
            //            drawingWall(event);
            //        }
            //    }
                
            //});

            //element.bind('mouseup', function (event) {
            //    // stop drawing
            //    eventStarted = false;
            //    if (drawType == "mouse") {
            //        angular.forEach(walls, function (value, key) {
            //            if (isClickOnWall(event, value)) {
            //                value.isSelected = true;
            //            } else {
            //                value.isSelected = false;
            //            }
            //        });
            //        renderMap();
            //    }

            //});
        }

        var selectItem = function(event) {
            


        }


        var isClickOnWall = function (event, theWall) {
            var result = false;
            var calculatedX = event.offsetX;//(event.offsetX + canvasOffsetX) / zoom;
            var calculatedY = event.offsetY;//(event.offsetY + canvasOffsetY) / zoom;
            if ((calculatedX - theWall.startX - 15) * (calculatedX - theWall.endX + 15) <= 0 && (calculatedY - theWall.startY - 15) * (calculatedY - theWall.endY + 15) <= 0) {
                result = true;
            }
            console.log(result);
            return result;
        }



        var startDrawingWall = function(event) {
            currentWall = new wall(drawType == "doublewall" ? 2 : 1, (event.offsetX + canvasOffsetX) / zoom, (event.offsetY + canvasOffsetY) / zoom);
            walls.push(currentWall);

        };

        

        var drawingWall = function (event) {
            // get current mouse position
            var currentX = (event.offsetX + canvasOffsetX) / zoom;
            var currentY = (event.offsetY + canvasOffsetY) / zoom;

            var dX = currentX - currentWall.startX;
            var dY = currentY - currentWall.startY;

            var hypotenuse = Math.sqrt(dX * dX + dY * dY);

            var angle = Math.asin(dY / hypotenuse) * 180 / Math.PI;

            var matchedAngle = tools.closest(angle, predefinedWallAngles);

            var newX = hypotenuse * Math.cos(matchedAngle * (Math.PI / 180)) * (dX > 0 ? 1 : -1) + currentWall.startX;
            var newY = hypotenuse * Math.sin(matchedAngle * (Math.PI / 180)) + currentWall.startY;
            
            tools.log("angle:" + angle + " matchedAngle:" + matchedAngle + " (" + Math.sin(matchedAngle * (Math.PI / 180)) + ") current:" + currentX + "(" + newX + ")," + currentY + " (" + newY + ")");
            currentWall.endX = newX;
            currentWall.endY = newY;

            renderMap();
        };


        var renderMap = function () {
            reset();

            var seed = 50;

            //var offsetX = canvasOffsetX % seed;

            //var offsetY = canvasOffsetY % seed;

            //if (canvasOffsetX - offsetX == 0) {
            //    offsetX = -seed;
            //}

            //if (canvasOffsetY - offsetY == 0) {
            //    offsetY = -seed;
            //}

            var width = canvas.getWidth();
            var height = canvas.getHeight();

            var offsetX = width % seed;
            var offsetY = height % seed;


            var background = new fabric.Group([], { selectable: false});

            for (var i = offsetX - width; i < (width * 2) ; i += seed) {
                background.addWithUpdate(new fabric.Line([i, -height, i, height * 2], { stroke: "lightgray", strokeWidth: 1, selectable: false, strokeDashArray: [5, 5] }));
            }

            for (var j = offsetY - height; j < height * 2 ; j += seed) {
                
                background.addWithUpdate(new fabric.Line([-width, j, width * 2, j], { stroke: "lightgray", strokeWidth: 1, selectable: false, strokeDashArray: [5, 5] }));
            }

            canvas.add(background);
            ////var absolutePoint = new fabric.Point(0, 0);
            //var invertedMatrix = fabric.util.invertTransform(canvas.viewportTransform);
            //var transformedP = fabric.util.transformPoint(p, invertedMatrix);
            //var absolutePoint = new fabric.Point(canvasOffsetX, canvasOffsetY);
            //canvas.absolutePan(absolutePoint);
            console.log("initial to:" + canvasOffsetX + "," + canvasOffsetY);
            //canvas.relativePan(relativePoint);

            angular.forEach(switches, function (value, key) {


            });


            angular.forEach(walls, function (value, key) {
                console.log(value);
                if (value.type == 1) {
                    var line = getSingleLine(value.x, value.y, value.length, value.angle, value);
                    canvas.add(line);
                } else if (value.type == 2) {
                    var group = getDoubleLine(value.x, value.y, value.length, value.angle, value);
                    canvas.add(group);
                }

            });
        }

        var drawMap = function (theSite) {
            site = theSite;
            walls = theSite.wallViewModels;
            switches = theSite.switchViewModels;
            renderMap();
        }

        var zoomInToPoint = function(point) {
            var oldZoom = zoom;

            zoom *= 1.1;
            if (zoom > 2.14358881) {
                zoom = 2.14358881;
            }

            if (oldZoom != zoom) {
                canvas.zoomToPoint(point, zoom);
            }
        }

        var zoomOutToPoint = function (point) {
            var oldZoom = zoom;
            zoom /= 1.1;
            if (zoom < 0.21762913579014877126127954074337) {
                zoom = 0.21762913579014877126127954074337;
            }

            if (oldZoom != zoom) {
                canvas.zoomToPoint(point, zoom);
            }
        }

        var canvasService = {

            init: function (theElement, theAttributes) {
                element = theElement;

                attributes = theAttributes;


                canvas = new fabric.Canvas('map-canvas');
                canvas.selection = false;
                ctx = canvas.getContext('2d', {
                    isDrawingMode: false
                });
                resizeCanvas();

                
                
                registerEvents();
            },

            drawMap: drawMap,

            setDrawType: function (type) {
                console.log(type);
                //if (canvas !== undefined) {
                //    if (type == "wall" || type == "doublewall" || type == "switch") {
                //        canvas.isDrawingMode = true;
                //    } else {
                //        canvas.isDrawingMode = false;
                //    }
                //}
                    
                
                drawType = type;
            },

            getDrawType: function() {
                return drawType;
            },

            zoomIn: function () {

                zoomInToPoint(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2));

            },

            zoomOut: function () {
                zoomOutToPoint(new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2));
            },

            save: function () {
                siteService.saveMap(site.id, walls).then(function(data) {
                    if (data.success) {
                        drawMap(data.result);
                    }
                });
            },

            deleteSelection: function () {
                if (canvas.getActiveGroup()) {
                    canvas.getActiveGroup().forEachObject(function(o) {
                         canvas.remove(o);
                    });
                    canvas.discardActiveGroup().renderAll();
                } else {
                    var object = canvas.getActiveObject();

                    if (object && object.wall && object.wall.id) {
                        object.wall.isDirty = true;
                        object.wall.isDelete = true;
                    }
                    canvas.remove(object);                    
                }
            }
        }


        return canvasService;
    }
]);