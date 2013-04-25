$.getScript("https://js.braintreegateway.com/v1/braintree.js", function(data, textStatus, jqxhr) {
	var braintree = Braintree.create("YourClientSideEncryptionKey");
    braintree.onSubmitEncryptForm('braintree-payment-form');
});


