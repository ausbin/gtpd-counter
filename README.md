GTPD Mental Health Incident Response Monitor
============================================

This is the source code for a tracker for incidents in which the Georgia Tech
Police Department reported an incident tagged with the mental health "offense
code." You can visit the production tracker here:
<https://gtpd-monitor.austinjadams.com/>

This repository holds the AWS CloudFormation template for the tracker (in
`template.yaml`). The job is a Lambda that runs daily. This repository uses
[SAM][1], a handy wrapper around [CloudFormation][2]. The frontend (in
`frontend/`) is a simple React app. I've licensed all this under the MIT
license in case anyone wants to adapt/improve it.

How I update the backend (maybe [pipx][3] can replace the first two commands):

    $ . ~/.venv/bin/activate
    $ pip install --upgrade awscli aws-sam-cli
    $ ./update.sh

The first time you run this, you'll need to:

 1. Add a CNAME record for the hostname, which is needed for generating the SSL
    cert. If you go to the Events tab in the CloudFront section of the AWS
    Console for the stack, you can see what CNAME it expects
 2. Add A and AAAA records which are aliases for the CloudFront
    distribution once CloudFormation has set it up
 3. Upload the frontend:
    1. Go to the frontend directory: `cd frontend`
    2. Install dependencies: `npm install`
    3. Build prod frontend: `npm run build`
    4. Upload prod frontend: `cd build && aws s3 sync . s3://gtpd-monitor-website/`

To locally test the lambda, you can use `./local.py`. There are various flags
that change its behavior. You can create a virtualenv (e.g., `virtualenv -p
python3 venv; . venv/bin/activate`) and use `requirements.txt` to install the
dependencies (`pip install -r update_function/requirements.txt`). There's
probably some overcomplicated SAM way to do this instead but I don't care

Links
-----

* Main link (goes through CloudFront): <https://gtpd-monitor.austinjadams.com/>
* Backup link (hits S3 directly, useful if you want to bypass CloudFront for
  debugging): <http://gtpd-monitor-website.s3-website-us-east-1.amazonaws.com/>

[1]: https://aws.amazon.com/serverless/sam/
[2]: https://aws.amazon.com/cloudformation/
[3]: https://github.com/pypa/pipx
