import {Meteor} from "meteor/meteor";
import {Messages} from "../messages.js";
import {Tags} from "../../tags/tags.js";

import {commonFilter} from "../filters";

Meteor.publishComposite('messages', function () {
    return {
        find() {
            return Messages.find({}, commonFilter);
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});

Meteor.publishComposite('messagesByTag', function (tag) {
    return {
        find() {
            const tagText = '#' + tag;
            const tagFound = Tags.findOne({text: tagText});

            let tagToBeUsed;

            if (tagFound) {
                tagToBeUsed = tagFound;
            } else {
                tagToBeUsed = Tags.insert({text: tagText});
            }

            return Messages.find({tags: tagToBeUsed._id}, commonFilter);
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});

Meteor.publishComposite('messagesByIds', function (ids) {
    return {
        find() {
            return Messages.find({_id: {$in: ids}});
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});