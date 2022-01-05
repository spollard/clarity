/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { DemoTabData } from '../components/demo.component';

@Component({
  selector: 'app-datalist',
  template: `
    <h1 cds-text="heading" cds-layout="m-b:lg m-t:lg">Datalist</h1>

    <demo [tabs]="demo">
      <h3 cds-text="section" cds-layout="m-b:lg">Datalist with text items</h3>
    </demo>

    <demo [tabs]="demo2">
      <h3 cds-text="section" cds-layout="m-b:lg">Reactive forms</h3>
      <p>Using Angular forms inside datalist</p>
    </demo>
  `,
})
export class DatalistPage {
  demo: DemoTabData[] = [
    {
      name: 'Angular',
      files: {
        'src/app/app.component.ts': 'datalist/datalist.1.angular.txt',
      },

      template: 'angular',
    },
    {
      name: 'Core',
      files: {
        'src/app/app.component.ts': 'datalist/datalist.1.core.txt',
      },

      template: 'core',
    },
  ];

  demo2: DemoTabData[] = [
    {
      name: 'Angular',
      files: {
        'src/app/app.component.ts': 'datalist/datalist.2.angular.txt',
      },

      template: 'angular',
    },
    {
      name: 'Core',
      files: {
        'src/app/app.component.ts': 'datalist/datalist.2.core.txt',
      },

      template: 'core',
    },
  ];
}