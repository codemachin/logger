# Electron logger

Angular 8 compatible electron logger to save logs to file.

## Installation

Use npm

```bash
npm install @vivekshankar/logger
```

## Usage in node js

```javascript
import { FiddlerLog } from '@vivekshankar/logger';
const logger = FiddlerLog.getInstance();
logger.fiddlerLogger("debug",e,e.stack);
logger.fiddlerLogger("error",e,e.stack);
```

## Usage in Angular 8 app.module

```javascript
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  imports: [NgxElectronModule]
})
```

## Usage in Angular 8 component

```javascript
import {ElectronService} from 'ngx-electron';

export class WelcomeComponent {
    public logger:any
    constructor(private _electronService: ElectronService) { 
        if(this._electronService.isElectronApp) {
            const logger = this._electronService.remote.require('@vivekshankar/logger').FiddlerLog
            this.logger = logger.getInstance();
            this.logger.fiddlerLogger("info",'log from client',new Error('re').stack);
        }
    }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/codemachin/logger/blob/master/LICENSE)