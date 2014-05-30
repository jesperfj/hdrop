## Simple Dropbox service backed by S3

The simplest possible dropbox service.

### Install

Assuming you have your AWS credentials set up in `~/.aws/credentials` as described in [the docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html), set up the S3 bucket, IAM user and access keys with:

    $ bin/setup some-service-name
    Setting up hdrop resource named hdrop-some-service-name
    Creating stack..........
    BUCKETNAME=hdrop-some-service-name-hdropbucket-zd1pjbdtae3e4
    ACCESSKEY=AKIA...
    SECRETKEY=7z+Wd5w1...

Create a Heroku app:

    $ heroku create
    Creating stark-river-4697... done, stack is cedar
    http://stark-river-4697.herokuapp.com/ | git@heroku.com:stark-river-4697.git
    Git remote heroku added

Set the parameters from above as config vars:

    $ heroku config:set \
    > BUCKETNAME=hdrop-some-service-name-hdropbucket-zd1pjbdtae3e4
    > ACCESSKEY=AKIA...
    > SECRETKEY=7z+Wd5w1...
    Setting config vars and restarting stark-river-4697... done, v3
    BUCKETNAME: hdrop-some-service-name-hdropbucket-zd1pjbdtae3e4
    ACCESSKEY: AKIA...
    SECRETKEY: 7z+Wd5w1...

Push your code:

    $ git push heroku master
    ...

### Use

Get a set of get and put URLs:

    $ curl https://stark-river-4697.herokuapp.com
    {
      "get": "https://hdrop-some-service-name-hdropbucket-zdpjvb2d9oe4.s3.amazonaws.com/f4064499-930a-4138-88aa-94cb8a945708?AWSAccessKeyId=AKIAJPZ4VTR2WP3DVUNQ&Expires=1401484596&Signature=IZPT5%2BLEGws68dVIiAmbngvAsHE%3D",
      "put": "https://hdrop-some-service-name-hdropbucket-zdpjvb2d9oe4.s3.amazonaws.com/f4064499-930a-4138-88aa-94cb8a945708?AWSAccessKeyId=AKIAJPZ4VTR2WP3DVUNQ&Expires=1401484596&Signature=7hfoidVxmYWxwrHNsXm1iPn86Ks%3D"
    }

Upload your file with the put URL:

    curl $your_put_url --upload-file path/to/file

Send the get URL to your best friend who gets the file with:

    curl $get_url -o saved_file

The Signed URLs expire after 10 mins. You can change that. Of course.
