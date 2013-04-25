#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2

from google.appengine.api import memcache

import braintree

braintree.Configuration.configure(
    braintree.Environment.Sandbox,
    "tnxsfx6t24txq93n",
    "z8ts5ffprj6q62s8",
    "3ca2081b05252a10e17b1fd95867b41f"
)

braintree.Configuration.use_unsafe_ssl = True

class MainHandler(webapp2.RequestHandler):
    def get(self):
    	self.response.headers['Access-Control-Allow-Origin'] = '*'
    	if (memcache.get('boss')):
    		self.response.write(memcache.get('boss'))
    		memcache.replace('boss', False)
    	else:
    		self.response.write('false')

    def post(self):
    	self.response.headers['Access-Control-Allow-Origin'] = '*'
        if memcache.get('boss') == None:
    		memcache.add('boss', self.request.get('from'))
    	else:
    		memcache.replace('boss', self.request.get('from'))

class Payment(webapp2.RequestHandler):
    def get(self):
        self.do()
    def post(self):
        self.do()
    def do(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        amount = self.request.get('amount')
        number = self.request.get('number')
        expiration_date = self.request.get('expiration_date')

        params = {
            "amount": amount,
            "credit_card": {
                "number": number,
                "expiration_date": expiration_date
            }
        }

        result = braintree.Transaction.sale(params)

        if result.is_success:
            print "success!: " + result.transaction.id
            self.response.write(result.transaction.id);
            return
        elif result.transaction:
            print "Error processing transaction:"
            print "  message: " + result.message
            print "  code:    " + result.transaction.processor_response_code
            print "  text:    " + result.transaction.processor_response_text
        else:
            print "message: " + result.message
            for error in result.errors.deep_errors:
                print "attribute: " + error.attribute
                print "  code: " + error.code
                print "  message: " + error.message

        self.response.write('ERROR:\n' + result.message);


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/pay', Payment)
], debug=True)
