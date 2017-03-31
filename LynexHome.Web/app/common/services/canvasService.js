common.factory('canvasService', ["settings", "$q", "$window", "toolService",
    function (settings, $q, $window, tools) {

        var zoom = 1;

        var canvasOffsetX = 0;
        var canvasOffsetY = 0;

        var predefinedWallAngles = [-90, -67.5, -45, -22.5, 0, 22.5, 45, 67.5, 90];

        var element;
        var canvas;
        var fabricCanvas;
        var ctx;
        var attributes;
        var drawType;

        //map elements
        var walls;
        var switches;

        var wall = function (type, sx, sy) {
            this.type = type;
            this.startX = sx;
            this.startY = sy;

            this.endX = sx;
            this.endY = sy;
        };


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
            fabricCanvas.clear();
            fabricCanvas.renderAll();
        }

        var drawDoubleLine = function (x, y, length, angle) {

            var line1 = new fabric.Line([(x - zoom) * zoom - canvasOffsetX, y * zoom - canvasOffsetY, (x - zoom) * zoom - canvasOffsetX, (y + length) * zoom - canvasOffsetY], {
                stroke: attributes.strokeStyle,
                strokeWidth: zoom,
            });

            var line2 = new fabric.Line([(x + zoom) * zoom - canvasOffsetX, y * zoom - canvasOffsetY, (x + zoom) * zoom - canvasOffsetX, (y + length) * zoom - canvasOffsetY], {
                stroke: attributes.strokeStyle,
                strokeWidth: zoom,
            });

            var group = new fabric.Group([line1, line2], {
                hasRotatingPoint: false,
                lockScalingX: true,
                angle: angle,
                hasBorders: false,
                cornerColor: 'red',
            });
            group.setControlsVisibility({ 'tl': false, 'tr': false, 'ml': false, 'mr': false, 'bl': false, 'br': false, });
            fabricCanvas.add(group);
        }

        var drawLine = function (x, y, length, angle) {

            var line = new fabric.Line([x * zoom - canvasOffsetX, y * zoom - canvasOffsetY, x * zoom - canvasOffsetX, (y + length) * zoom - canvasOffsetY], {
                targetFindTolerance: true,
                angle: angle,
                stroke: attributes.strokeStyle,
                strokeWidth: 2 * zoom,
                hasRotatingPoint: false
            });

            line.setControlsVisibility({ 'tl': false, 'tr': false, 'ml': false, 'mr': false, 'bl': false, 'br': false, });
            fabricCanvas.add(line);
        }

        var resizeCanvas = function() {
            

            fabricCanvas.setHeight($window.innerHeight - 90);
            fabricCanvas.setWidth($window.innerWidth);

            tools.log("Canvas Size:" + canvas.width + "," + canvas.height);
        }


        var registerEvents = function () {
            canvas.addEventListener("touchstart", function (e) {
                //mousePos = getMousePos(canvas, e);
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);

            canvas.addEventListener("touchend", function (e) {
                var mouseEvent = new MouseEvent("mouseup", {});
                canvas.dispatchEvent(mouseEvent);
            }, false);

            canvas.addEventListener("touchmove", function (e) {
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);


            // Prevent scrolling when touching the canvas
            document.body.addEventListener("touchstart", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
            document.body.addEventListener("touchend", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
            document.body.addEventListener("touchmove", function (e) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);


            element.bind('mousedown', function (event) {

                eventStarted = true;
                if (drawType == 'hand') {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else if (drawType == "wall" || drawType == "doublewall") {
                    startDrawingWall(event);
                }
            });

            element.bind('mousemove', function (event) {
                if (eventStarted) {
                    if (drawType == 'hand') {
                        canvasOffsetX -= event.offsetX - lastX;
                        canvasOffsetY -= event.offsetY - lastY;
                        tools.log("canvasOffset:" + canvasOffsetX + "," + canvasOffsetY);
                        lastX = event.offsetX;
                        lastY = event.offsetY;
                        renderMap();
                    } else if (drawType == "wall" || drawType == "doublewall") {
                        drawingWall(event);
                    }
                }
                
            });

            element.bind('mouseup', function (event) {
                // stop drawing
                eventStarted = false;
                if (drawType == "mouse") {
                    angular.forEach(walls, function (value, key) {
                        if (isClickOnWall(event, value)) {
                            value.isSelected = true;
                        } else {
                            value.isSelected = false;
                        }
                    });
                    renderMap();
                }

            });
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

            angular.forEach(switches, function (value, key) {


            });



            angular.forEach(walls, function (value, key) {
                if (value.type == 1) {
                    drawLine(value.x, value.y, value.length, value.angle);
                } else if (value.type == 2) {
                    drawDoubleLine(value.x, value.y, value.length, value.angle);
                }

            });
        }

        var recalculateCanvasOffsetAffterZooming = function (previousZoom) {
            canvasOffsetX = canvas.width / previousZoom * zoom - (canvas.width - canvasOffsetX / previousZoom * zoom);
            canvasOffsetY = canvas.height / previousZoom * zoom - (canvas.height - canvasOffsetY / previousZoom * zoom);

            //canvasOffsetX = canvasOffsetX / previousZoom * zoom + (canvas.width * (zoom - 1));//(canvasOffsetX + canvas.width) / previousZoom * zoom - canvas.width;    
            //canvasOffsetY = canvasOffsetY / previousZoom * zoom + (canvas.height * (zoom - 1));//(canvasOffsetY + canvas.height) / previousZoom * zoom - canvas.height;
            tools.log("Canvas Offset:" + canvasOffsetX + "," + canvasOffsetY);
        }


        var canvasService = {

            init: function (theElement, theAttributes) {
                element = theElement;
                canvas = element[0];
                
                attributes = theAttributes;


                fabricCanvas = new fabric.Canvas('map-canvas');
                fabricCanvas.selection = false;
                ctx = fabricCanvas.getContext('2d', {
                    isDrawingMode: true
                });
                resizeCanvas();

                //var circle = new fabric.Circle({
                //    radius: 20, fill: 'green', left: 100, top: 100
                //});
                //var triangle = new fabric.Triangle({
                //    width: 20, height: 30, fill: 'blue', left: 50, top: 50
                //});

                
                

                //fabricCanvas.add();
                
                //registerEvents();
            },

            drawMap: function (site) {
                walls = site.wallViewModels;
                switches = site.switchViewModels;
                renderMap();
            },

            setDrawType: function (type) {
                console.log(type);
                if (fabricCanvas !== undefined) {
                    if (type == "wall" || type == "doublewall" || type == "switch") {
                        fabricCanvas.isDrawingMode = true;
                    } else {
                        fabricCanvas.isDrawingMode = false;
                    }
                }
                    
                
                drawType = type;
            },

            getDrawType: function() {
                return drawType;
            },

            zoomIn: function () {

                var oldZoom = zoom;

                zoom += 0.1;
                if (zoom > 2) {
                    zoom = 2;
                }

                if (oldZoom != zoom) {
                    recalculateCanvasOffsetAffterZooming(oldZoom);
                    renderMap();
                }
            },

            zoomOut: function () {
                var oldZoom = zoom;
                zoom -= 0.1;
                if (zoom < 1) {
                    zoom = 1;
                }

                if (oldZoom != zoom) {
                    recalculateCanvasOffsetAffterZooming(oldZoom);
                    renderMap();
                }
                
            },

            deleteSelection: function () {
                if (fabricCanvas.getActiveGroup()) {
                    fabricCanvas.getActiveGroup().forEachObject(function (o) { fabricCanvas.remove(o); });
                    fabricCanvas.discardActiveGroup().renderAll();
                } else {
                    fabricCanvas.remove(fabricCanvas.getActiveObject());
                }
            }
        }


        return canvasService;
    }
]);