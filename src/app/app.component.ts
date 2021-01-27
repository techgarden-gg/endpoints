import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'endpoints';
  outputs = '';
  inputForm = new FormGroup({
    serviceName: new FormControl(''),
    serviceLabel: new FormControl(''),
    servicePortName: new FormControl('https'),
    servicePortProtocol: new FormControl('tcp'),
    servicePort: new FormControl('443'),
    targetPort: new FormControl('443'),
    endpointName: new FormControl(''),
    endpointLabel: new FormControl(''),
    endpointAddress: new FormControl(''),
    endpointPort: new FormControl('443'),
    endpointPortName: new FormControl('https')
  })

  generateOutput() {
    let inputs = this.inputForm.value;
    console.log(inputs);
    this.outputs = `apiVersion: v1
kind: Service
metadata:
  name: ${inputs.serviceName}
  labels:
    service: ${inputs.serviceLabel ? inputs.serviceLabel : (inputs.serviceName + '-label')}
spec:
  clusterIP: None
  ports:
    - name: ${inputs.servicePortName}
      protocol: ${inputs.servicePortProtocol}
      port: ${inputs.servicePort}
      targetPort: ${inputs.targetPort}
---
apiVersion: v1
kind: Endpoints
metadata:
  name: ${inputs.endpointName}
  labels:
    service: ${inputs.endpointLabel ? inputs.endpointLabel : (inputs.endpointName + '-label')}
subsets:
  - addresses:
      - ip: ${inputs.endpointAddress}
    ports:
      - port: ${inputs.endpointPort}
        name: ${inputs.endpointPortName}`;
  }

  copyToClipboard() {
  }
}
