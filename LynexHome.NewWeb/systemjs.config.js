/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
        System.config({
            paths: {
                // paths serve as alias
                'npm:': 'node_modules/'
            },
            // map tells the System loader where to look for things
            map: {
                // our app is within the app folder
                app: 'app',

                // angular bundles
                '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
                '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
                '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
                '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
                '@angular/platform-browser-dynamic':
                    'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
                '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
                '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
                'ng2-dnd': 'npm:ng2-dnd/bundles/index.umd.js',
                'moment': 'npm:moment',
                'angular2-moment': 'npm:angular2-moment',
                'sweetalert2': 'npm:sweetalert2/dist/sweetalert2.min.js',
                // other libraries
                'rxjs': 'npm:rxjs',
                'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
                '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
                'bootstrap': 'npm:bootstrap/dist/js/bootstrap.min.js'
    },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            '@ng-bootstrap/ng-bootstrap': {
                defaultExtension: 'js'
            },
            bootstrap: {
                defaultExtension: 'js'
            },
            'moment': {
                main: './moment.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'sweetalert2': {
                defaultExtension: 'js'
            }
        }
    });

})(this);
